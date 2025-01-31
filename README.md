Ce code crée une architecture simple inspirée de Home Assistant, avec un backend Python gérant les WebSockets et un frontend TypeScript utilisant des composants Web pour afficher et interagir avec les entités. 
Le backend simule des changements d'état en réponse aux commandes du frontend, et le frontend met à jour l'interface utilisateur en fonction des messages reçus via WebSocket.
AVANT GIT
git init
git add .
gti commit -m 'name commit'
git push
git status, git log, git k&
les branches
git branch -a   voir les autres branches
git branch name_new_branch   crée la branche
git checkout name_branch  se déplacer sur la nouvelle branch
git checkout -b name_new_branch  #fait les 2 d'avant en 1 seule commande


Le serveur python s'exécute dans un environnement env.
on a une isolation des dépendances.



.\backend
python -m venv env
.\env\Scripts\activate
Installer les dépendances:
pip install fastapi uvicorn websockets
ou dans un fichier requirements.txt
pip install -r requirements.txt

.\frontend
mkdir frontend
cd frontend
npm init -y

Installer Typescript et un bundler (par exemple webpack)
npm install --save-dev typescript ts-loader webpack webpack-cli

--------------------------------------------
execution:
cd frontend
npm run build

cd backend  # Retournez à la racine du projet
python main.py


tester:
http://localhost:8000/
ouvrir le devtools du navigateur: ctri+maj+i
vider le cache ctrl+maj+r



config webpack
const path = require('path');

module.exports = {
  entry: './src/app.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
--------------------------------------------------------------
______________________________________________________________
Dockeriser mon application
Pour dockeriser votre application avec un backend Python (FastAPI) et un frontend TypeScript, vous devez créer deux Dockerfiles distincts et un fichier docker-compose.yml pour les lier. Voici comment procéder :


dans le backend créer un dockerfile:---------------------------------------
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]


Assurez vous d'avoir un fichier requirements.txt dans le répertoire backend
---------------------------------------------------------------------------
dans le frontend créer un dockerfile:--------------------------------------
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
---------------------------------------------------------------------------
créer un fichier nginx.conf dans le répertoire frontend
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /ws {
        proxy_pass http://backend:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
---------------------------------------------------------------------------
créer un fichier docker-compose.yml à la racine du projet
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend


---------------------------------------------------------------------------
Modification
Dans le fichier backend/app.py la ligne de code:
uvicorn.run(app, host="localhost", port=8000)
par
uvicorn.run(app, host="0.0.0.0", port=8000)

Dans le fichier frontend/src/app.ts modifier l'url du webscoket:
this.ws = new WebSocket('ws://localhost/ws');

Construction et exécution
du conteneur utilisez les commande à la racine du projet
docker-compose build
docker-compose up

Votre application sera accessible à l'adresse http://localhost, avec le backend sur http://localhost/api et le WebSocket sur ws://localhost/ws













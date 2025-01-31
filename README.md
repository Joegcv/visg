Ce code crée une architecture simple inspirée de Home Assistant, avec un backend Python gérant les WebSockets et un frontend TypeScript utilisant des composants Web pour afficher et interagir avec les entités. 
Le backend simule des changements d'état en réponse aux commandes du frontend, et le frontend met à jour l'interface utilisateur en fonction des messages reçus via WebSocket.

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


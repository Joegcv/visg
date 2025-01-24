Ce code crée une architecture simple inspirée de Home Assistant, avec un backend Python gérant les WebSockets 
et un frontend TypeScript utilisant des composants Web pour afficher et interagir avec les entités. 
Le backend simule des changements d'état en réponse aux commandes du frontend, et le frontend met à jour l'interface
utilisateur en fonction des messages reçus via WebSocket.

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

cd ..  # Retournez à la racine du projet
python main.py

from fastapi import FastAPI, WebSocket
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import asyncio
import os

app = FastAPI()

# Chemin absolu vers le répertoire frontend
frontend_directory = os.path.join(os.path.dirname(__file__), '../../frontend')

# Servir les fichiers statiques du frontend
#app.mount("/", StaticFiles(directory=frontend_directory, html=True), name="static")
app.mount("/dist", StaticFiles(directory=os.path.join(frontend_directory, "dist")), name="static")

@app.get("/",response_class=HTMLResponse)
async def read_root():
    with open(os.path.join(frontend_directory, "index.html")) as f:
        return HTMLResponse(content=f.read(), status_code=200)
    

# Stocker les connexions WebSocket actives
active_connections = []

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            #data = await websocket.receive_text()
            data = await websocket.receive_json()
            print(f"Received message: {data}")  # Log le message reçu
            # Simuler un changement d'état
            await asyncio.sleep(1)
            await websocket.send_json(
                {   "type": "state_changed",
                    "entity_id": "light.living_room", 
                    #utilisation de l'entity_id reçu
                    "state": "on" if data['action'] == "turn_on" else "off"
                })
    finally:
        active_connections.remove(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)

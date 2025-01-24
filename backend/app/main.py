from fastapi import FastAPI, WebSocket
from fastapi.staticfiles import StaticFiles
import asyncio
import os

app = FastAPI()

# Chemin absolu vers le répertoire frontend
frontend_directory = os.path.join(os.path.dirname(__file__), '../../frontend')

# Servir les fichiers statiques du frontend
app.mount("/", StaticFiles(directory=frontend_directory, html=True), name="static")

# Stocker les connexions WebSocket actives
active_connections = []

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Simuler un changement d'état
            await asyncio.sleep(1)
            await websocket.send_json({"type": "state_changed", "entity_id": "light.living_room", "state": "on" if data == "turn_on" else "off"})
    finally:
        active_connections.remove(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

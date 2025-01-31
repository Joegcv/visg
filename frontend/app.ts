// app.ts
class hawebsocket extends HTMLElement {
    private ws: WebSocket;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.ws = new WebSocket('ws://localhost:8000/ws');
       //track websocket
       this.ws.onopen = () => {
        console.log('WebSocket connection established');
        this.updateConnectionStatus(true);
    };
    this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
    
    this.ws.onclose = () => {
        console.log('WebSocket connection closed');
        this.updateConnectionStatus(true);
    };

    //fin tracker websocket
        this.ws.onmessage = this.handleMessage.bind(this);
    }
   //**************fin du constructeur****************

    connectedCallback() {
        this.render();
    }

    
    private updateEntityState(entityId: string, state: string) {
        const element = this.shadowRoot?.querySelector(`[data-entity-id="${entityId}"]`);
        if (element) {
            element.setAttribute('state', state);
        }
    }

    updateConnectionStatus(connected: boolean) {
        const statusElement = this.shadowRoot?.getElementById('connection-status');
        console.log(statusElement);
        if (statusElement) {
            statusElement.textContent = connected ? 'Connected' : 'Disconnected';
            statusElement.style.color = connected ? 'green' : 'red';
        }
    }

    // Modification de la gestion des messages
    private handleMessage(event: MessageEvent) {
        try {
            const data = JSON.parse(event.data);
            console.log(data);
            if (data.type === 'state_changed') {
                console.log(data.state);
                this.updateEntityState(data.entity_id, data.state);
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    }
    

    private render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    .entity { padding: 10px; margin: 5px; border: 1px solid #ccc; }
                    .entity[state="on"] { background-color: yellow; }
                    .entity[state="off"] { background-color: grey; }
                </style>
                <div class="entity" data-entity-id="light.living_room" state="off">
                    Living Room Light
                    <button id="turnOn">Turn On</button>
                    <button id="turnOff">Turn Off</button>
                </div>
            `;

            this.shadowRoot.getElementById('turnOn')?.addEventListener('click', () => {
                this.ws.send(JSON.stringify({ 
                    type: 'state_changed',
                    action: 'turn_on', 
                    entity_id: 'light.living_room' 
                }));
            });

            this.shadowRoot.getElementById('turnOff')?.addEventListener('click', () => {
                this.ws.send(JSON.stringify({ 
                    type: 'state_changed',
                    action: 'turn_off', 
                    entity_id: 'light.living_room' 
                }));
            });

            

        }
    }
}

customElements.define('web-socket', hawebsocket);


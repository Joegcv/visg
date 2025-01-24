// app.ts
class app extends HTMLElement {
    private ws: WebSocket;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.ws = new WebSocket('ws://localhost:8000/ws');
        this.ws.onmessage = this.handleMessage.bind(this);
    }

    connectedCallback() {
        this.render();
    }

    private handleMessage(event: MessageEvent) {
        const data = JSON.parse(event.data);
        if (data.type === 'state_changed') {
            this.updateEntityState(data.entity_id, data.state);
        }
    }

    private updateEntityState(entityId: string, state: string) {
        const element = this.shadowRoot?.querySelector(`[data-entity-id="${entityId}"]`);
        if (element) {
            element.setAttribute('state', state);
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
                    <button @click="${() => this.ws.send('turn_on')}">Turn On</button>
                    <button @click="${() => this.ws.send('turn_off')}">Turn Off</button>
                </div>
            `;
        }
    }
}

customElements.define('home-assistant', app);

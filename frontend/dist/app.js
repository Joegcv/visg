/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (() => {

eval("\n// app.ts\nclass hawebsocket extends HTMLElement {\n    constructor() {\n        super();\n        this.attachShadow({ mode: 'open' });\n        this.ws = new WebSocket('ws://localhost:8000/ws');\n        //track websocket\n        this.ws.onopen = () => {\n            console.log('WebSocket connection established');\n            this.updateConnectionStatus(true);\n        };\n        this.ws.onerror = (error) => {\n            console.error('WebSocket error:', error);\n        };\n        this.ws.onclose = () => {\n            console.log('WebSocket connection closed');\n            this.updateConnectionStatus(true);\n        };\n        //fin tracker websocket\n        this.ws.onmessage = this.handleMessage.bind(this);\n    }\n    //**************fin du constructeur****************\n    connectedCallback() {\n        this.render();\n    }\n    updateEntityState(entityId, state) {\n        var _a;\n        const element = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`[data-entity-id=\"${entityId}\"]`);\n        if (element) {\n            element.setAttribute('state', state);\n        }\n    }\n    updateConnectionStatus(connected) {\n        var _a;\n        const statusElement = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('connection-status');\n        console.log(statusElement);\n        if (statusElement) {\n            statusElement.textContent = connected ? 'Connected' : 'Disconnected';\n            statusElement.style.color = connected ? 'green' : 'red';\n        }\n    }\n    // Modification de la gestion des messages\n    handleMessage(event) {\n        try {\n            const data = JSON.parse(event.data);\n            console.log(data);\n            if (data.type === 'state_changed') {\n                console.log(data.state);\n                this.updateEntityState(data.entity_id, data.state);\n            }\n        }\n        catch (error) {\n            console.error('Error parsing message:', error);\n        }\n    }\n    render() {\n        var _a, _b;\n        if (this.shadowRoot) {\n            this.shadowRoot.innerHTML = `\r\n                <style>\r\n                    .entity { padding: 10px; margin: 5px; border: 1px solid #ccc; }\r\n                    .entity[state=\"on\"] { background-color: yellow; }\r\n                    .entity[state=\"off\"] { background-color: grey; }\r\n                </style>\r\n                <div class=\"entity\" data-entity-id=\"light.living_room\" state=\"off\">\r\n                    Living Room Light\r\n                    <button id=\"turnOn\">Turn On</button>\r\n                    <button id=\"turnOff\">Turn Off</button>\r\n                </div>\r\n            `;\n            (_a = this.shadowRoot.getElementById('turnOn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {\n                this.ws.send(JSON.stringify({\n                    type: 'state_changed',\n                    action: 'turn_on',\n                    entity_id: 'light.living_room'\n                }));\n            });\n            (_b = this.shadowRoot.getElementById('turnOff')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {\n                this.ws.send(JSON.stringify({\n                    type: 'state_changed',\n                    action: 'turn_off',\n                    entity_id: 'light.living_room'\n                }));\n            });\n        }\n    }\n}\ncustomElements.define('web-socket', hawebsocket);\n\n\n//# sourceURL=webpack://frontend/./src/app.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/app.ts"]();
/******/ 	
/******/ })()
;
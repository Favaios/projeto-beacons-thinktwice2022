const http = require('http');
const WebSocket = require("ws");

module.exports = (() => {
  let state = { wss: null, server: null }
  
  state.init = app => {
    state.server = http.createServer(app);
    state.wss = new WebSocket.Server({ server: state.server, path: "/api/ws" });
  }

  state.send = data => state.wss ? state.wss.clients.forEach(ws => ws.send(JSON.stringify(data))) : ''

  return state
})()

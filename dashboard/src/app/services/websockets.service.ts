import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  endpoint = 'ws:localhost/api/ws'
  callback: (msg: any) => any = () => null

  ws: WebSocket | null = null

  constructor() { }

  private connect () {
    this.ws = new WebSocket(this.endpoint)
    this.ws.onmessage = msg => this.handle(msg)
  }

  setCallback (callback: (msg: any) => any) {
    if (this.ws === null) this.connect()
    this.callback = callback
  }

  handle (msg: any) {
    if (this.ws === null || !this.ws?.OPEN) this.connect()
    this.callback(msg)
  }

}

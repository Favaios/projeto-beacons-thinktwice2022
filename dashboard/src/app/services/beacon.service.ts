import { WebsocketsService } from 'src/app/services/websockets.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import Beacon from '../interfaces/Beacon';

@Injectable({
  providedIn: 'root'
})
export class BeaconService {

  endpoint = environment.apiUrl + '/beacons'

  constructor(private http: HttpClient) { }

  getAll () {
    return this.http.get<Beacon[]>(this.endpoint)
  }

  get (id: string) {
    return this.http.get<Beacon>(this.endpoint + '/' + id)
  }

  create (id: string, name: string, locationId: number) {
    return this.http.post(this.endpoint, { id, name, locationId })
  }

  edit (id: string, data: { id?: string, name?: string, locationId?: number }) {
    return this.http.put(this.endpoint + '/' + id, data)
  }

  delete (id: string) {
    return this.http.delete(this.endpoint + '/' + id)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import Device from '../interfaces/Device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  endpoint = environment.apiUrl + '/detections'

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Device[]>(this.endpoint + '/states')
  }

  get(id: string) {
    return this.http.get<Device>(this.endpoint + '/states/' + id)
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import Location from '../interfaces/Location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  endpoint =  environment.apiUrl + '/locations'

  constructor(private http: HttpClient) { }

  getAll () {
    return this.http.get<Location[]>(this.endpoint)
  }

  get (id: number) {
    return this.http.get<Location>(this.endpoint + '/' + id)
  }

  create (name: string) {
    return this.http.post(this.endpoint, { name })
  }

  edit (id: number, name: string) {
    return this.http.put(this.endpoint + '/' + id, { name })
  }

  delete (id: number) {
    return this.http.delete(this.endpoint + '/' + id)
  }
}

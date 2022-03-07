import { DeviceService } from './device.service';
import { LocationService } from './location.service';
import { AlertService } from './alert.service';
import { WebsocketsService } from 'src/app/services/websockets.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Location from '../interfaces/Location';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  endpoint = environment.apiUrl + "/statistics"

  constructor(private http: HttpClient, private websocketsService: WebsocketsService, private alertService: AlertService, private locationService: LocationService, private deviceService: DeviceService) { }

  getDetectionsByLocation(locationId: number | string = "") {
    let params = {}
    if (locationId !== "") params = { ...params, ...{ location: locationId } }

    return this.http.get<{data: {c: number, location: Location}[]}>(this.endpoint + '/detections', { params })
  }

  getDetectionsByPeriod(locationId: number | string = "") {
    let params = {}
    if (locationId !== "") params = { ...params, ...{ location: locationId } }

    return this.http.get<{data: {c: number, ts: number}[]}>(this.endpoint + '/bucket', { params })
  }

  notifyDetections(callback: (msg: any) => any) {
    this.websocketsService.setCallback((msg: any) => {
      callback(msg)

      msg = JSON.parse(msg.data)
      
      if (msg.new) {
        this.deviceService.get(msg.deviceId).subscribe(deviceData => {
          this.locationService.get(msg.locationId).subscribe(locationData => {
            this.alertService.addAlert({
              state: deviceData.state ? 'Active' : 'Innactive',
              location: locationData.name,
              ts: msg.ts
            })
          })
        })
      }

      console.log(msg)
    })
  }

}

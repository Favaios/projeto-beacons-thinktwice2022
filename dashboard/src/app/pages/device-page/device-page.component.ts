import { DeviceService } from './../../services/device.service';
import { Component, OnInit } from '@angular/core';
import Device from '../../interfaces/Device';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-device-page',
  templateUrl: './device-page.component.html',
  styleUrls: ['./device-page.component.scss']
})
export class DevicePageComponent implements OnInit {

  endpoint = environment + '/devices'

  columns = [
    {title: 'Id', name: 'deviceId'},
    {title: 'State', name: 'state', format: (v: any) => v ? 'Active' : 'Innactive'},
  ]
  data: Device[] = []

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.deviceService.getAll().subscribe(data => this.data = data)
  }

}

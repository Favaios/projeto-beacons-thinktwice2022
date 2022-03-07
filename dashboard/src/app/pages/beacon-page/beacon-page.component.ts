import { LocationService } from './../../services/location.service';
import { BeaconService } from './../../services/beacon.service';
import { Component, OnInit } from '@angular/core';
import Beacon from 'src/app/interfaces/Beacon';
import Location from 'src/app/interfaces/Location';

@Component({
  selector: 'app-beacon-page',
  templateUrl: './beacon-page.component.html',
  styleUrls: ['./beacon-page.component.scss']
})
export class BeaconPageComponent implements OnInit {

  locations: Location[] = []

  columns = [
    {title: 'Id', name: 'id'},
    {title: 'Name', name: 'name'},
    {title: 'Location', name: 'location', format: (location: Location) => location.id + ' - ' + location.name},
    {title: '', icon: 'edit', color: 'secondary', modal: 'exampleModal', click: (beacon: Beacon) => this.update(beacon)},
    {title: '', icon: 'times', color: 'danger', click: (beacon: Beacon) => this.beaconService.delete(beacon.id).subscribe(() => this.loadData())},
  ]
  data: Beacon[] = []

  id: string = ""
  name: string = ""
  location: number | null = null

  entryId: string | null = null

  constructor(public beaconService: BeaconService, private locationService: LocationService) { }

  ngOnInit(): void {
    this.loadData()
    this.loadLocations()
  }

  loadData() {
    this.beaconService.getAll().subscribe(data => this.data = data)
  }

  loadLocations() {
    this.locationService.getAll().subscribe(data => this.locations = data)
  }

  submit() {
    if (this.entryId === null && this.location === null) return

    this.entryId === null ?
    this.beaconService.create(this.id, this.name, this.location!).subscribe(() => this.loadData()) :
    this.beaconService.edit(this.entryId, {id: this.id, name: this.name, locationId: this.location!}).subscribe(() => this.loadData())
  }

  update(beacon: Beacon) {
    this.entryId = beacon.id

    this.id = beacon.id
    this.name = beacon.name
    this.location = beacon.location.id

    this.loadLocations()
  }

  create() {
    this.entryId = null

    this.id = ""
    this.name = ""
    this.location = null

    this.loadLocations()
  }

}

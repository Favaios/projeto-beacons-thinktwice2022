import { LocationService } from './../../services/location.service';
import { Component, OnInit } from '@angular/core';
import Location from 'src/app/interfaces/Location';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.scss']
})
export class LocationPageComponent implements OnInit {

  columns = [
    {title: 'Id', name: 'id'},
    {title: 'Name', name: 'name'},
    {title: '', icon: 'edit', color: 'secondary', modal: 'exampleModal', click: (location: Location) => this.update(location)},
    {title: '', icon: 'times', color: 'danger', click: (location: Location) => this.locationService.delete(location.id).subscribe(() => this.loadData())},
  ]
  data: Location[] = []

  name: string = ""

  entryId: number | null = null

  constructor(public locationService: LocationService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.locationService.getAll().subscribe(data => this.data = data)
  }

  submit() {
    this.entryId === null ?
    this.locationService.create(this.name).subscribe(() => this.loadData()) :
    this.locationService.edit(this.entryId, this.name).subscribe(() => this.loadData())
  }

  update(location: Location) {
    this.entryId = location.id
    this.name = location.name
  }

  create() {
    this.entryId = null
    this.name = ""
  }

}

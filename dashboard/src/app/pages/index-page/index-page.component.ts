import { LocationService } from './../../services/location.service';
import { StatisticsService } from './../../services/statistics.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import Location from 'src/app/interfaces/Location';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {

  locations: (Location | { id: string, name: string })[] = []

  detectionsPieChartLabels: string[] = []
  detectionsPieChartValues: number[] = []
  detectionsPieChartLocationFilter: number | string = ""

  detectionsLineChartLabels: string[] = []
  detectionsLineChartValues: number[] = []
  detectionsLineChartLocationFilter: number | string = ""

  constructor(private statisticsService: StatisticsService, private locationService: LocationService) { 
  }

  ngOnInit(): void {
    this.loadData()
    this.statisticsService.notifyDetections(this.loadData.bind(this))
  }

  loadData () {
    this.loadLocations()
    this.loadPieChart()
    this.loadLineChart()
  }

  loadLineChart () {
    this.statisticsService.getDetectionsByPeriod(this.detectionsLineChartLocationFilter).subscribe(data => {
      this.detectionsLineChartValues.splice(0, this.detectionsLineChartValues.length)
      this.detectionsLineChartValues.push(...data.data.map(elem => elem.c))

      this.detectionsLineChartLabels.splice(0, this.detectionsLineChartLabels.length)
      this.detectionsLineChartLabels.push(...data.data.map(elem => new Date(elem.ts*1000).toLocaleTimeString()))

      Chart.getChart('detectionsPeriod')!.update()
    })
  }

  loadPieChart () {
    this.statisticsService.getDetectionsByLocation(this.detectionsPieChartLocationFilter).subscribe(data => {
      this.detectionsPieChartValues.splice(0, this.detectionsPieChartValues.length)
      this.detectionsPieChartValues.push(...data.data.map(elem => elem.c))
      this.detectionsPieChartLabels = data.data.map(elem => elem.location.name)

      Chart.getChart('locationDetections')!.update()
    })
  }

  loadLocations () {
    this.locationService.getAll().subscribe(data => this.locations = data)
  }

  printReport () {
    window.print()
  }

  a(){}
}

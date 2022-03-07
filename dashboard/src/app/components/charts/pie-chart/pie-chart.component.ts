import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() id: string = ""
  @Input() labels: string[] = []
  @Input() data: number[] = []
  @Input() colors: string[] = []
  @Input() hoverColors: string[] = []

  type = 'doughnut'
  options = { cutout: 100 }

  dataset = {
    data: this.data,
    backgroundColor: this.colors,
    hoverBackgroundColor: this.hoverColors,
    hoverBorderColor: "rgba(234, 236, 244, 0)"
  }

  constructor() {
  }

  ngOnInit(): void {
    this.dataset.data = this.data
    this.dataset.backgroundColor = this.colors
    this.dataset.hoverBackgroundColor = this.hoverColors
  }

}

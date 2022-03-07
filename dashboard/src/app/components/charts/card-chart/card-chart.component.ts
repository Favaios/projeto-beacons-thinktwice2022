import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-chart',
  templateUrl: './card-chart.component.html',
  styleUrls: ['./card-chart.component.scss']
})
export class CardChartComponent implements OnInit {

  @Input() title: string = ""
  @Input() actions: { name?: string, callback?: () => any, modal?: string }[] = []
  @Input() actionsHeader: string = ""

  @Input() chartId: string = ""
  @Input() chartType: 'pie' | 'line' = "line"
  @Input() chartLabels: string[] = []
  @Input() chartData: number[] = []
  @Input() chartDataLabel: string = ""
  @Input() chartColors: string[] = []
  @Input() chartHoverColors: string[] = []

  constructor() { }

  ngOnInit(): void {
  }

  isAction (action: {name?: any}) {
    return Object.keys(action).includes('name')
  }

}

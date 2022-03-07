import { ChartOptions, ChartDataset, TooltipModel, ChartTypeRegistry, TooltipItem } from 'chart.js';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() id: string = ""
  @Input() labels: string[] = []
  @Input() dataLabel: string = ""
  @Input() data: number[] = []

  opts: ChartOptions = {
    plugins: {
      tooltip: {
        titleFont: { size: 14 },
        callbacks: { label: this.getTooltipLabel }
      }
    },
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxis: {
        time: {
          unit: 'day'
        },
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      },
      yAxis: {
        ticks: {
          maxTicksLimit: 5,
          padding: 10
        },
        grid: {
          color: "rgb(234, 236, 244)",
          borderDash: [2]
        }
      },
    }
  }

  dataset: ChartDataset = {
    label: this.dataLabel,
    data: this.data
  }

  constructor() { }

  getTooltipLabel (this: TooltipModel<keyof ChartTypeRegistry>, tooltipItem: TooltipItem<keyof ChartTypeRegistry>) {
    var datasetLabel = this.chart.data.datasets[tooltipItem.datasetIndex].label || '';
    return datasetLabel + ': ' + tooltipItem.raw;
  }  

  ngOnInit(): void {
    this.dataset.label = this.dataLabel
    this.dataset.data = this.data
  }

}

import { Chart } from 'chart.js';


export default function () {
  Chart.defaults.font.family = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.color = '#858796';

  Chart.defaults.maintainAspectRatio = false
  Chart.defaults.plugins.legend.display = false
  Chart.defaults.plugins.tooltip.backgroundColor = "rgb(255,255,255)"
  Chart.defaults.plugins.tooltip.bodyColor = "#858796"
  Chart.defaults.plugins.tooltip.borderColor = "#dddfeb"
  Chart.defaults.plugins.tooltip.borderWidth = 1
  Chart.defaults.plugins.tooltip.padding = 15
  Chart.defaults.plugins.tooltip.displayColors = false
  Chart.defaults.plugins.tooltip.caretPadding = 10
  Chart.defaults.plugins.tooltip.titleMarginBottom = 10
  Chart.defaults.plugins.tooltip.titleColor = '#6e707e'
  Chart.defaults.plugins.tooltip.intersect = false
  Chart.defaults.plugins.tooltip.mode = 'index'

  Chart.defaults.datasets.pie.hoverBorderColor = "rgba(234, 236, 244, 0)"

  Chart.defaults.datasets.line.tension = 0.3
  Chart.defaults.datasets.line.fill = true
  Chart.defaults.datasets.line.backgroundColor = "rgba(78, 115, 223, 0.05)"
  Chart.defaults.datasets.line.borderColor = "rgba(78, 115, 223, 1)"
  Chart.defaults.datasets.line.pointRadius = 3
  Chart.defaults.datasets.line.pointBackgroundColor = "rgba(78, 115, 223, 1)"
  Chart.defaults.datasets.line.pointBorderColor = "rgba(78, 115, 223, 1)"
  Chart.defaults.datasets.line.pointHoverRadius = 3
  Chart.defaults.datasets.line.pointHoverBackgroundColor = "rgba(78, 115, 223, 1)"
  Chart.defaults.datasets.line.pointHoverBorderColor = "rgba(78, 115, 223, 1)"
  Chart.defaults.datasets.line.pointHitRadius = 10
  Chart.defaults.datasets.line.pointBorderWidth = 2
}
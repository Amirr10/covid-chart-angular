import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {
  
  constructor(private http: ApiService) { }

  @Input() datasets:any;
  //data for filling the chart component
  type: string
  data: object
  options: object

  chartData: object[] = [] //array that stores all datasets objects for the chart component
  dateFormatDisplay: string[]

  ngOnInit() {

    this.type = 'line';
    this.data = {
      labels: [],
      datasets: []
    }
    this.options = {
      responsive: true,
      maintainAspectRatio: false
    };
  }

  
  drawChart(datasetArr) {

    this.chartData = datasetArr.dataArray
    this.dateFormatDisplay = datasetArr.dateDisplay

    this.type = 'line';
    this.data = {
      labels: this.dateFormatDisplay.map(date => date),
      datasets: this.chartData
    }
    this.options = {
      animation: false
    }
  }
}

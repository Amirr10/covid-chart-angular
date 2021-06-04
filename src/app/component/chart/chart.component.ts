import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {

  constructor(private http: ApiService){ }

  ngOnInit(){
    this.type = 'line';
    this.data = {
        labels: [2020, 2021],
        datasets:  [] //array of objects 
      }
      this.options = {
        responsive: true,
        maintainAspectRatio: false
      };
  }
  
  //data for filling the chart component
  type: string
  data: object
  options: object

  chartData: object[] = [] //array that stores all datasets objects for the chart component

  drawChart(datasetArr) {

    this.chartData = datasetArr

    this.type = 'line';
    this.data = {
      labels: ['2020', '2021'],
      datasets: this.chartData //array of objects 
    }
    this.options = {
      animation: false,
      scales: {
        x: {
          type: 'timeseries',

        }
      }
    }
  }

    //labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep' ,'Oct' ,'Nov' ,'Dec'],
}

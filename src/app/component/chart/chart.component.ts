import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {
  
  constructor() { }

  @Input() datasetsAndDates:any;
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

  ngOnChanges(){
    this.chartData = this.datasetsAndDates?.dataArray
    this.dateFormatDisplay = this.datasetsAndDates?.dateDisplay

    this.type = 'line';
    this.data = {
      labels: this.dateFormatDisplay?.map(date => date),
      datasets: this.chartData
    }
    this.options = {
      animation: false
    }
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  datasetsAndDates: object

  type: string
  data: object
  options: object

  drawChart(data){
    this.type = 'line'
    this.data = {
      labels: data.dateDisplay.map(date => date),
      datasets: data.dataArray
    }
    this.options = {
      animation: false
    }

    this.datasetsAndDates = data
  }
}

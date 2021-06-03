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

  type: any
  data: any
  options: any

  temp: any
  fetchedData: any
  objKeys: string[]

  chartData:any = []
  flag: boolean = false


  drawChart(arrObj: any){

    let chart = document.querySelector('chart')

    this.chartData = arrObj

    this.type = 'line';
    this.data = {
        labels: ['2020','2021'],
        datasets:  this.chartData //array of objects 
      }
      this.options = {
          animation: false,
          scales: {
              x: {
                type: 'timeseries',

                  }    
              }
          }
       

    this.flag = true
  }

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

  

      // type = 'line';
      // data = {
      //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep' ,'Oct' ,'Nov' ,'Dec'],

      //     datasets: [
      //       {
      //         label: this.chartData.label ,
      //         data: this.chartData.data,
      //         fill: this.chartData.fill,
      //         backgroundColor: this.chartData.backgroundColor,
      //         borderColor: this.chartData.borderColor ,
      //         borderWidth: this.chartData.borderWidth 
      //       }

            //WORKSSSSSSSSSSSSSS
        //     {
        //       label: 'State',
        //       data: [12, 25, 3, 5, 2, 3,30,50,4,3,2,4,6,8,11,2,4],
        //       fill: false,
        //       backgroundColor: [
        //           'rgba(255, 99, 132, 0.2)',
        //           'rgba(54, 162, 235, 0.2)',
        //           'rgba(255, 206, 86, 0.2)',
        //           'rgba(75, 192, 192, 0.2)',
        //           'rgba(153, 102, 255, 0.2)',
        //           'rgba(255, 159, 64, 0.2)'
        //       ],
        //       borderColor: [
        //           'rgba(255, 99, 132, 1)',
        //           'rgba(54, 162, 235, 1)',
        //           'rgba(255, 206, 86, 1)',
        //           'rgba(75, 192, 192, 1)',
        //           'rgba(153, 102, 255, 1)',
        //           'rgba(255, 159, 64, 1)'
        //       ],
        //       borderWidth: 1
        //   },
        //   {
        //     label: '# of Votes',
        //     data: [8, 19, 10, 9, 17, 1],
        //     fill: false,
        //     backgroundColor: [
        //         'rgba(255, 99, 132, 0.2)',
        //         'rgba(54, 162, 235, 0.2)',
        //         'rgba(255, 206, 86, 0.2)',
        //         'rgba(75, 192, 192, 0.2)',
        //         'rgba(153, 102, 255, 0.2)',
        //         'rgba(255, 159, 64, 0.2)'
        //     ],
        //     borderColor: [
        //         'rgba(255, 159, 64, 1)'
        //     ],
        //     borderWidth: 1
        // }

      //   ]
      // }
      // options = { };



}

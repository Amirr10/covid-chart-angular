import { Component, EventEmitter, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { ChartDataset } from 'chart.js';
import { Subscription } from 'rxjs';
import { Months } from '../../models/months';
import { ItemClickedEvent } from 'src/app/models/item-clicked-event';
import { ApiService } from '../../service/api.service';
import * as jsonData from '../../states_hash.json'

import {FormGroup, FormControl} from '@angular/forms';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent implements OnInit, OnDestroy {
  range = new FormGroup({
  start: new FormControl(),
  end: new FormControl()
  });

  @Output() onItemClicked = new EventEmitter()
  @Output() onDateSelected = new EventEmitter()

  json: any = (jsonData as any).default

  menuGridArr: object[] = [] //store the menu data
  stateKeysArr: string[] //array to init the menu grid
  subscription: Subscription;

  stateName: string
  postalName: string

  dateDisplayFormat: number
  selectedDate: any
  dataArray: any = [] //array of the fetched data that will be sent to the chart
  
  datasetsAndDates: object
  allSelectedDaysArr = []

  minDate: Date; //min date for the calander config
  maxDate: Date; //max date for the calander config

  startDate: string 
  endDate: string

  tooltip: string

  constructor(private apiService: ApiService) {    
    const currentYear = new Date().getFullYear();

    this.minDate = new Date(2019, 0, 1);
    this.maxDate = new Date(currentYear, 5, 7);
  }

  ngOnInit(): void {
    this.stateKeysArr = Object.keys(this.json)

    for (const key of this.stateKeysArr) {

      let countryJson = this.json[key]
      let countryName = countryJson.country
      let currencyCode = countryJson.currency_code

      this.menuGridArr.push({ state: countryName, postal: currencyCode })
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onHover(event){
    this.tooltip = event.state
  }

  getEndDate(event){
    
      if (this.range.value.end) {
        let parsedStartDate = this.range.value.start.toString()
        let parsedEndDate = this.range.value.end.toString()

        this.startDate = this.parseFullDate(parsedStartDate)
        this.endDate = this.parseFullDate(parsedEndDate)
        this.selectedDate = { start: this.startDate, end: this.endDate }

        this.getDateInput(this.selectedDate)
      }
  }

  //parse the date when a user selects a date from the datepicker
  getDateInput(timeFrame) {

      let tempArr = [...this.dataArray]
      this.dataArray = []

    //loop through the states and make a req with the new the date
      tempArr.map(obj => {
        let eventObject = { date: this.selectedDate, postalCode: obj.label, isSelected: true }
        this.itemClicked(eventObject)
      })
  }

  //get data from api by postalCode and date code
  itemClicked(event) { // {postalCode, date}
  
    let date = this.selectedDate
    let startDate = date.start
    let endDate = date.end
    let isSelected = event.isSelected
    let postalCode = event.postalCode.toUpperCase()
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);

    //add data to chart
    if (isSelected) {
      //fetch Data from the state we want by postal code
      this.subscription = this.apiService.getCurrencyData(postalCode ,startDate, endDate)
        .subscribe(res => {
         
          let data:any = res
          this.allSelectedDaysArr = []
        
          let keys = Object.keys(data.rates)
          let currencyArr = []
          let currecnyDates = []

          for (const key in keys) {
            let dateKey = keys[key]
            let currencyObj = data.rates[keys[key]]
            let currencyRate = currencyObj[postalCode]
          
            currencyArr.push(currencyRate)
            currecnyDates.push(dateKey)
            this.allSelectedDaysArr.push(dateKey)
          }

          let chartDataSet = {
            label: postalCode,
            data: currencyArr,
            fill: false,
            backgroundColor: [`#${randomColor}`],
            borderColor: [`#${randomColor}`],
            borderWidth: 1,
          }

          this.dataArray.push(chartDataSet)
          this.datasetsAndDates = { dataArray: this.dataArray, dateDisplay: this.allSelectedDaysArr }

          this.onItemClicked.emit(this.datasetsAndDates)
        });

      //remove data from chart
    } else {
      let temp = [...this.dataArray]
      this.dataArray = temp.filter(obj => obj.label !== postalCode.toUpperCase())

      this.datasetsAndDates = { dataArray: this.dataArray, dateDisplay: this.allSelectedDaysArr }
      this.onItemClicked.emit(this.datasetsAndDates)
    }
  }

  displayDateMsg(msg) {
    alert(msg)
  }

  parseFullDate(dateObj) {
    let strArr = dateObj.split(" ")

    let month = strArr[1]
    let day = strArr[2]
    let year = strArr[3]

    let parsedMonth = this.parseMonth(month)
    let shapedDate = `${year}${parsedMonth}${day}`
    // this.selectedDate = parseInt(shapedDate)
    let parsedDateDisplayFormat = `${year}-${parsedMonth}-${day}`

    return parsedDateDisplayFormat
  }

  parseToDateFormat(date) {
    let dateToArr = date.toString().split('')
    let year = dateToArr.slice(0, 4).reduce((acc, curr) => acc + curr)
    let month = dateToArr.slice(4, 6).reduce((acc, curr) => acc + curr)
    let day = dateToArr.slice(6, 8).reduce((acc, curr) => acc + curr)

    let dateFormatDisply = `${year}-${month}-${day}`
    return dateFormatDisply
  }

  parseMonth(month) {
    let numMonth: string

    switch (month) {
      case Months.January:
        numMonth = "01"
        break
      case Months.February:
        numMonth = "02"
        break
      case Months.March:
        numMonth = "03"
        break
      case Months.April:
        numMonth = "04"
        break
      case Months.May:
        numMonth = "05"
        break
      case Months.June:
        numMonth = "06"
        break
      case Months.July:
        numMonth = "07"
        break
      case Months.August:
        numMonth = "08"
        break
      case Months.September:
        numMonth = "09"
        break
      case Months.October:
        numMonth = "10"
        break
      case Months.November:
        numMonth = "11"
        break
      case Months.December:
        numMonth = "12"
        break

      default:
        numMonth = "00"
    }
    return numMonth
  }

}

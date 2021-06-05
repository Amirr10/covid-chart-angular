import { Component, EventEmitter, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { ChartDataset } from 'chart.js';
import { Subscription } from 'rxjs';
import { Months } from '../../models/months';
import { ItemClickedEvent } from 'src/app/models/item-clicked-event';
import { ApiService } from '../../service/api.service';
import * as jsonData from '../../states_hash.json'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnDestroy {

  @Input() keys
  @Output() stateData = new EventEmitter()

  json: any = (jsonData as any).default

  menuGridArr: object[] = [] //store the menu data
  stateKeysArr: string[] //array to init the menu grid
  subscription: Subscription;

  stateName: string
  postalName: string

  dateDisplayFormat: string
  selectedDate: number 
  dataArray: any = [] //array of the fetched data that will be sent to the chart
  datasetsAndDates: object
  allSelectedDaysArr: string[]

  minDate: Date; //min date for the calander config
  maxDate: Date; //max date for the calander config

  constructor(private http: ApiService) {
    const currentYear = new Date().getFullYear();

    this.minDate = new Date(2020, 3, 4);
    this.maxDate = new Date(currentYear, 2, 7);
  }

  ngOnInit(): void {
    this.stateKeysArr = Object.keys(this.json)

    for (const key of this.stateKeysArr) {

      let stateName = this.json[key]
      let postalName = key

      this.menuGridArr.push({ state: stateName, postal: postalName })
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //parse the date when a user selects a date from the datepicker
  getDateInput(event) {
    let dateObj = event.value.toString();

    if (!this.selectedDate) {
      return this.parseFullDate(dateObj);
    }
    //update the current checked states with the new Date
    else {
      this.selectedDate = this.parseFullDate(dateObj)

      let tempArr = [...this.dataArray]
      this.dataArray = []

      //loop through the states and make a req with the new the date
      tempArr.map(obj => {

        let eventObject = { date: this.selectedDate, postalCode: obj.label, isSelected: true }
        this.fetchDataFromDate(eventObject)
      })
    }
  }

  //get data from api by postalCode and date code
  fetchDataFromDate(event: ItemClickedEvent) { // {postalCode, date}

    let date = this.selectedDate
    let isSelected = event.isSelected
    let postalCode = event.postalCode
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);

    //add data to chart
    if (isSelected) {
      //fetch Data from the state we want by postal code
      this.subscription = this.http.getCovidData(postalCode)
        .subscribe(res => {
          let data = res
          let index = data.findIndex(obj => obj.date === date)

          let filtered = data.slice(0, index)
          let temp = filtered[0]
          let positiveArr = filtered.map(obj => obj.positive)
          this.allSelectedDaysArr = filtered.map(obj => this.parseToDateFormat(obj.date)).reverse()

          let stateObj: ChartDataset = {
            label: temp.state,
            data: positiveArr,
            fill: false,
            backgroundColor: [`#${randomColor}`],
            borderColor: [`#${randomColor}`],
            borderWidth: 1,
          }

          this.dataArray.push(stateObj)
          this.datasetsAndDates = { dataArray: this.dataArray, dateDisplay: this.allSelectedDaysArr }

          this.stateData.emit(this.datasetsAndDates)
        })

      //remove data from chart
    } else {
      let temp = [...this.dataArray]

      this.dataArray = temp.filter(obj => obj.label !== postalCode.toUpperCase())
      this.datasetsAndDates = { dataArray: this.dataArray, dateDisplay: this.allSelectedDaysArr }

      this.stateData.emit(this.datasetsAndDates)
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
    this.selectedDate = parseInt(shapedDate)
    this.dateDisplayFormat = `${year}-${parsedMonth}-${day}`

    return this.selectedDate
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

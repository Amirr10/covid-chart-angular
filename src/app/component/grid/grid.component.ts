import { error } from '@angular/compiler/src/util';
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ApiService } from '../../service/api.service';
import * as jsonData from '../../states_hash.json'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() keys
  @Output() stateData = new EventEmitter()

  json:any = (jsonData as any).default

  menuGridArr: object[] = [] //store the menu data
  stateKeysArr: string[] //array to init the menu grid

  stateName: string 
  postalName: string

  selectedDate: number //store the user current selected date
  dataArray:any = [] //array of the fetched data that will be sent to the chart

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

      this.menuGridArr.push({state: stateName, postal: postalName})
    }
  }

  //parse the date when a user select a date from the datepicker
  getDateInput(e){
    let dateObj = e.value.toString()

    if(this.selectedDate === undefined){
        return this.parseFullDate(dateObj)
    } 
    //update the current checked states with the new Date
    else {
      this.selectedDate =  this.parseFullDate(dateObj)

      //get the array data of all the checked states
      let tempArr = [...this.dataArray]

      //reset the array of states
      this.dataArray = [] 

      //loop through the states and make a req with the new the date
      tempArr.map(obj => {

          let eventObject = { date: this.selectedDate, postalCode: obj.label, checkbox: true}
          this.fetchDataFromDate(eventObject)
      })
    }

  }

  //get data from api by postalCode and date code
    fetchDataFromDate(eventObject){ // {postalCode, date}

    let date = this.selectedDate
    let checkbox = eventObject.checkbox
    let postalCode = eventObject.postalCode
    let randomColor = Math.floor(Math.random()*16777215).toString(16);

    //add data to chart
    if(checkbox){
      //fetch Data from the state we want by postal code
        this.http.getData(`https://api.covidtracking.com/v1/states/${postalCode}/daily.json`)
        .subscribe(res => {
          let data = res
          let index = data.findIndex(obj => obj.date === date)

          let filtered = data.slice(0, index)
          let temp = filtered[0]
          let positiveArr = filtered.map(obj => obj.positive)

          let stateObj = {
            label: temp.state,
            data: positiveArr,
            date: date,
            fill: false,
            backgroundColor: [`#${randomColor}`],
            borderColor: [`#${randomColor}`],
            borderWidth: 1,
          }

          this.dataArray.push(stateObj)
          this.stateData.emit(this.dataArray)
        })
        
    //remove data from chart
    } else {
      let temp = [...this.dataArray]
      this.dataArray = temp.filter(obj => obj.label !== postalCode.toUpperCase())

      this.stateData.emit(this.dataArray)
    }
  }


  displayDateMsg(msg){
    alert(msg)
  }


  parseFullDate(dateObj){

    let strArr = dateObj.split(" ")

      let month = strArr[1]
      let day = strArr[2]
      let year = strArr[3]

      let parsedMonth = this.parseMonth(month)

      let shapedDate = `${year}${parsedMonth}${day}`

      this.selectedDate = parseInt(shapedDate)

      return this.selectedDate
  }


  parseMonth(month){
    let numMonth: string

    switch(month){
      case 'Jan':
        numMonth = "01"
        break
      case 'Feb':
        numMonth = "02"
        break
      case 'Mar':
        numMonth = "03"
        break
      case 'Apr':
        numMonth = "04"
        break
        case 'May':
        numMonth = "05"
        break
        case 'Jun':
        numMonth = "06"
        break
        case 'Jul':
        numMonth = "07"
        break
        case 'Aug':
        numMonth = "08"
        break
        case 'Sep':
        numMonth = "09"
        break
        case 'Oct':
        numMonth = "10"
        break
        case 'Nov':
        numMonth = "11"
        break
        case 'Dec':
        numMonth = "12"
        break

      default:
        numMonth = "00"
    }
    return numMonth
  }

}

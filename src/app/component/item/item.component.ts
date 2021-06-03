import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {

  @Input() objData:any
  @Input() date: number
  @Output() checkboxValue = new EventEmitter()
  @Output() msgError = new EventEmitter()
  
  checkbox: boolean
  keys:any 

  constructor() { }

  ngOnInit(): void {
    this.keys = this.objData 
  }

  getCheckboxVal(checkbox, postal) {

    console.log(this.date)
    let postalCode = postal.toLowerCase()
    this.checkbox = checkbox

    if (this.date !== undefined) {
      this.checkboxValue.emit({ postalCode, checkbox: this.checkbox })
    }
  }

  toggleCheckbox(postal){
    this.checkbox = !this.checkbox
    this.getCheckboxVal(this.checkbox, postal)
  }

  sendMsg(){
    if(this.date === undefined){
      this.msgError.emit('Please Select a Date')
    }
  }

}

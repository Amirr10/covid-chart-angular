import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemClickedEvent } from 'src/app/models/item-clicked-event';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {

  @Input() objData: any;
  @Input() date: number;
  @Output() itemClicked = new EventEmitter<ItemClickedEvent>();
  @Output() msgError = new EventEmitter<string>();

  checkbox: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  getCheckboxVal(checkbox, postal) {

    let postalCode = postal.toLowerCase()
    this.checkbox = checkbox

    if (this.date !== undefined) {
      this.itemClicked.emit({ postalCode, isSelected: this.checkbox })
    }
  }


  toggleCheckbox(postal): void {
    this.checkbox = !this.checkbox
    this.getCheckboxVal(this.checkbox, postal)
  }

  
  sendMsg(): void {
    if (this.date === undefined) {
      this.msgError.emit('Please Select a Date')
    }
  }

}

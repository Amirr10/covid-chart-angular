import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChartComponent } from './component/chart/chart.component';
import { HttpClientModule } from '@angular/common/http'
import { ApiService } from './service/api.service';
import { GridComponent } from './component/grid/grid.component'
import { ChartModule } from 'angular2-chartjs';

import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';

import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';

// import { MatDateRangePicker } from '@angular/material/datepicker/date-range-picker';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemComponent } from './component/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    GridComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSliderModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTableModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

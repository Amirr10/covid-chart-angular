import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartDataResponseDto } from '../dtos/chart-data-response-dto';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }
  private readonly covidDataApiPath = `https://api.covidtracking.com/v1/states/`;

  getCovidData(postalCode: string) {
    return this.http.get<any[]>(`${this.covidDataApiPath}/${postalCode}/daily.json`);
  }
}

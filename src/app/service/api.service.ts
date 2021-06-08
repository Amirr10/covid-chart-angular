import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartDataResponseDto } from '../dtos/chart-data-response-dto';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }
    private readonly currencyDataApiPath = `http://api.exchangeratesapi.io/v1/timeseries?access_key=API_KEY&`; //API Key
    private timeFrame = `start_date=2021-03-15&end_date=2021-04-09&base=EUR&symbols=USD,AUD,CAD,PLN,MXN`;
    
  getCurrencyData(currencyCode, startDate, endDate) {
    return this.http.get<any[]>(`${this.currencyDataApiPath}start_date=${startDate}&end_date=${endDate}&base=EUR&symbols=${currencyCode}`)
  }
}

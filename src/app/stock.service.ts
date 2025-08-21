import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StockService {
 private baseUrl = 'https://api.coingecko.com/api/v3/coins';

  constructor(private http: HttpClient) {}

  getCryptoData(coin: string, days: number = 7): Observable<any> {
    return this.http.get(`${this.baseUrl}/${coin}/market_chart?vs_currency=usd&days=${days}`);
  }
}

import { GetSell } from './../../Models/sell.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellService {

  private localHostURL = 'https://localhost:5001/API/Sell/ListSells';
  private azureURL = 'https://bbisa.azurewebsites.net/api/Sell/ListSells';
  private privateHostURL = 'https://raspi.skhalidq.dev/bbis_api/Sell/ListSells';

  redoGet: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  getSellList(): Observable<GetSell[]> {
    return this.http.get<GetSell[]>(this.privateHostURL);
  }
}

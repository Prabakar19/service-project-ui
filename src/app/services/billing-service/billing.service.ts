import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  billing = 'api/billing';
  transaction = '/api/transaction';
  getServicesUrl = 'api/customer/transaction/';

  constructor(private http: HttpClient) {}

  addBillingRequest(data: any): Observable<any> {
    //TODO: fix action type is sending in payload
    return this.http.post<any>(this.billing, data);
  }

  addTransactionListRequest(data: any): Observable<any> {
    return this.http.post<any>(this.transaction + '/list', data);
  }

  getServicesRequest(id: number): Observable<any> {
    return this.http.get<any>(this.getServicesUrl + id);
  }
  updateTransactionRequest(data: any, id: number): Observable<any> {
    return this.http.put<any>(this.transaction + '/' + id, data);
  }
}

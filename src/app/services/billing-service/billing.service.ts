import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  billing = 'api/billing';
  transaction = '/api/transaction';
  getCustTransactionUrl = 'api/transaction/customer/';

  constructor(private http: HttpClient) {}

  addBillingRequest(data: any): Observable<any> {
    //TODO: fix action type is sending in payload
    return this.http.post<any>(this.billing, data);
  }

  addTransactionListRequest(data: any): Observable<any> {
    return this.http.post<any>(this.transaction + '/list', data);
  }

  getServicesRequest(id: number): Observable<any> {
    return this.http.get<any>(this.getCustTransactionUrl + id);
  }
  updateTransactionRequest(data: any, txnId: number): Observable<any> {
    return this.http.put<any>(this.transaction + '/rating/' + txnId, data);
  }
}

import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  addBillingUrl = 'api/billing';
  transactionUrl = '/api/transaction/';
  getServicesUrl = 'api/customer/transaction/';

  constructor(private http: HttpClient) {}

  addBillingRequest(data: any): Observable<any> {
    return this.http.post<any>(this.addBillingUrl, data);
  }

  addTransactionRequest(data: any): Observable<any> {
    return this.http.post<any>(this.transactionUrl, data);
  }

  getServicesRequest(id: number): Observable<any> {
    return this.http.get<any>(this.getServicesUrl + id);
  }
  updateTransactionRequest(data: any, id: number): Observable<any> {
    return this.http.put<any>(this.transactionUrl + id, data);
  }
}

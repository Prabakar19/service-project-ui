import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceProviderService {
  root = 'api/serviceprovider';
  address = 'api/address/serviceprovider/';
  transaction = 'api/transaction/';

  constructor(private http: HttpClient) {}

  addServiceProviderRequest(data: any): Observable<any> {
    return this.http.post<any>(this.root, data);
  }
  addServiceProviderAddressReq(data: any, spId: number): Observable<any> {
    return this.http.post<any>(this.address + spId, data);
  }
  getServiceProviderRequest(id: number): Observable<any> {
    return this.http.get<any>(this.root + '/id/' + id);
  }
  getServiceProviderReport(id: number): Observable<any> {
    return this.http.get<any>(this.root + '/report/' + id);
  }
  updateTransactionStatusById(id: number, status: String): Observable<any> {
    return this.http.put<any>(this.transaction + id, {
      status: status,
    });
  }
  getServiceTransactionCount(id: number): Observable<any> {
    return this.http.get<any>(this.root + '/servicecount/' + id);
  }
  getSPCities(): Observable<any> {
    return this.http.get<any>(this.root + '/cities');
  }
  serviceProviderLoginRequest(data: any): Observable<any> {
    return this.http.post<any>(this.root + '/login', data);
  }
}

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
  meta_api = 'api/meta_api';

  constructor(private http: HttpClient) {}

  addServiceProviderRequest(data: any): Observable<any> {
    return this.http.post<any>(this.root, data);
  }
  addServiceProviderAddressReq(data: any, spId: string): Observable<any> {
    return this.http.post<any>(this.address + spId, data);
  }
  getServiceProviderRequest(id: string): Observable<any> {
    return this.http.get<any>(this.root + '/' + id);
  }
  getServiceProviderReport(id: string): Observable<any> {
    return this.http.get<any>(this.root + '/report/' + id);
  }
  updateTransactionStatusById(id: string, status: string): Observable<any> {
    return this.http.put<any>(this.transaction + id, { status });
  }
  getServiceTransactionCount(id: string): Observable<any> {
    return this.http.get<any>(this.root + '/servicecount/' + id);
  }
  getSPCities(): Observable<any> {
    return this.http.get<any>(this.meta_api + '/cities');
  }
  serviceProviderLoginRequest(data: any): Observable<any> {
    return this.http.post<any>(this.root + '/login', data);
  }
}

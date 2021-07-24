import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerServices {
  root = 'api/customer';
  addressUrl = 'api/address/';

  constructor(private http: HttpClient) {}

  addCustomerRequest(data: any): Observable<any> {
    return this.http.post<any>(this.root, data);
  }

  addCustomerAddressReq(data: any, custId: number): Observable<any> {
    return this.http.post<any>(this.addressUrl + 'customer/' + custId, data);
  }

  customerLoginRequest(data: any): Observable<any> {
    return this.http.post<any>(this.root + '/login', data);
  }

  customerFetch(data: number): Observable<any> {
    return this.http.get<any>(this.root + '/id/' + data);
  }

  updateCustomerRequest(data: any, id: number): Observable<any> {
    return this.http.put<any>(this.root + '/id/' + id, data);
  }
  updateAddressRequest(data: any, id: number): Observable<any> {
    return this.http.put<any>(this.addressUrl + id, data);
  }
  uploadImageRequest(data: any, id: number): Observable<any> {
    return this.http.post<any>(this.root + '/image/' + id, data);
  }
}

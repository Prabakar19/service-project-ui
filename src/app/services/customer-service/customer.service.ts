import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerServices {
  cust_root = 'api/customer';
  addressUrl = 'api/address/';

  constructor(private http: HttpClient) {}

  addCustomerRequest(data: any): Observable<any> {
    return this.http.post<any>(this.cust_root, data);
  }

  addCustomerAddressReq(data: any, custId: string): Observable<any> {
    return this.http.post<any>(this.addressUrl + 'customer/' + custId, data);
  }

  getCustomerAddressReq(custId: string): Observable<any> {
    return this.http.get<any>(this.cust_root + '/address/' + custId);
  }

  customerLoginRequest(data: any): Observable<any> {
    return this.http.post<any>(this.cust_root + '/login', data);
  }

  customerFetch(data: number): Observable<any> {
    return this.http.get<any>(this.cust_root + '/id/' + data);
  }

  updateCustomerRequest(data: any): Observable<any> {
    return this.http.put<any>(this.cust_root, data);
  }
  updateAddressRequest(data: any): Observable<any> {
    return this.http.put<any>(this.addressUrl, data);
  }
  uploadImageRequest(data: any, id: string): Observable<any> {
    return this.http.post<any>(this.cust_root + '/image/' + id, data);
  }
}

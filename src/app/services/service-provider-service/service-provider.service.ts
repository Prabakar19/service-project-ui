import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceProviderService {
  getServiceProviderUrl: string = 'api/serviceprovider/id/';
  addServiceProviderUrl = 'api/serviceprovider';
  addServiceProviderAddressUrl = 'api/address/serviceprovider/';
  serviceProviderLoginUrl = 'api/serviceprovider/login';
  getServiceProviderByIdUrl = 'api/serviceprovider/id/';
  getServiceProviderReportUrl = 'api/serviceprovider/report/';
  updateTransactionStatusByIdUrl = 'api/transaction/';
  getServiceTransactionCountUrl = 'api/serviceprovider/servicecount/';
  getCitiesUrl = 'api/serviceprovider/cities';

  constructor(private http: HttpClient) {}

  addServiceProviderRequest(data: any): Observable<any> {
    return this.http.post<any>(this.addServiceProviderUrl, data);
  }
  addServiceProviderAddressReq(data: any, spId: number): Observable<any> {
    return this.http.post<any>(this.addServiceProviderAddressUrl + spId, data);
  }

  getServiceProviderRequest(id: number): Observable<any> {
    return this.http.get<any>(this.getServiceProviderUrl + id);
  }

  getServiceProviderReport(id: number): Observable<any> {
    return this.http.get<any>(this.getServiceProviderReportUrl + id);
  }
  updateTransactionStatusById(id: number, status: String): Observable<any> {
    return this.http.put<any>(this.updateTransactionStatusByIdUrl + id, {
      status: status,
    });
  }

  getServiceTransactionCount(id: number): Observable<any> {
    return this.http.get<any>(this.getServiceTransactionCountUrl + id);
  }

  getSPCities(): Observable<any> {
    return this.http.get<any>(this.getCitiesUrl);
  }
  serviceProviderLoginRequest(data: any): Observable<any> {
    console.log("login request");
    return this.http.post<any>(this.serviceProviderLoginUrl, data);
  }

}

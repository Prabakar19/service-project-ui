import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  serviceIdUrl = 'api/service/id/';
  addServiceUrl = 'api/service/';
  modifyServiceUrl = 'api/service/id/';
  deleteServiceUrl = 'api/service/id/';

  constructor(private http: HttpClient) {}
  getServiceByIdRequest(id: number): Observable<any> {
    return this.http.get<any>(this.serviceIdUrl + id);
  }

  addServiceRequest(data: any): Observable<any> {
    return this.http.post<any>(this.addServiceUrl, data);
  }

  modifyServiceRequest(data: any, id: number): Observable<any> {
    return this.http.put<any>(this.modifyServiceUrl + id, data);
  }

  deleteServiceRequest(data: any, id: number): Observable<any> {
    return this.http.delete<any>(this.deleteServiceUrl + id, data);
  }

  updateServiceRequest(data: any, id: number): Observable<any> {
    return this.http.put<any>(this.serviceIdUrl + id, data);
  }

  getServiceList(id: number, name: string): Observable<any> {
    return this.http.get<any>(this.addServiceUrl + id + '/' + name);
  }
}

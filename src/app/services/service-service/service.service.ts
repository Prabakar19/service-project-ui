import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  root = 'api/service';

  constructor(private http: HttpClient) {}
  getServiceByIdRequest(id: string): Observable<any> {
    return this.http.get<any>(this.root + '/id/' + id);
  }

  addServiceRequest(data: any): Observable<any> {
    return this.http.post<any>(this.root, data);
  }

  modifyServiceRequest(serviceData: any): Observable<any> {
    return this.http.put<any>(this.root, serviceData);
  }

  deleteServiceRequest(id: string): Observable<any> {
    const requestOptions: Object = {
      responseType: 'text',
    };
    return this.http.delete<any>(this.root + '/id/' + id, requestOptions);
  }

  updateServiceRequest(data: any, id: string): Observable<any> {
    return this.http.put<any>(this.root + '/id/' + id, data);
  }

  getServiceList(id: string, name: string): Observable<any> {
    return this.http.get<any>(this.root + '/' + id + '/' + name);
  }

  getSPServiceList(serviceProviderId: string): Observable<any> {
    return this.http.get<any>(this.root + '/serviceprovider/' + serviceProviderId);
  }
}

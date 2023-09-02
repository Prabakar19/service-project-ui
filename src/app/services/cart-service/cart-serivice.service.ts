import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  root = 'api/cart';

  constructor(private http: HttpClient) {}

  addSericeToCartRequest(data: any): Observable<any> {
    return this.http.post<any>(this.root, data);
  }
  getCartListForCustomer(customerId: any): Observable<any> {
    return this.http.get<any>(this.root + '/' + customerId.customerId);
  }
}

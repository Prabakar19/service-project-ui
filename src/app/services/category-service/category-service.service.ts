import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryServiceService {
  getCategoryListUrl = 'api/category/all';
  getCategoryNameListUrl = 'api/category/allname';
  getCategoriesbyCityUrl = 'api/category/categorybycity/';
  categoryNameUrl = 'api/category/get/name/';

  constructor(private http: HttpClient) {}

  getCategoryListRequest(): Observable<any> {
    return this.http.get<any>(this.getCategoryListUrl);
  }
  getCategoryNameListRequest(): Observable<any> {
    return this.http.get<any>(this.getCategoryNameListUrl);
  }

  getCategoriesByCity(name): Observable<any> {
    return this.http.get<any>(this.getCategoriesbyCityUrl + name);
  }

  getCategoryByNameRequest(categoryName: string): Observable<any> {
    return this.http.get<any>(this.categoryNameUrl + categoryName);
  }
}

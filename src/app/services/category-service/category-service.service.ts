import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  root = 'api/category';

  constructor(private http: HttpClient) {}

  getCategoryListRequest(): Observable<any> {
    return this.http.get<any>(this.root + '/all');
  }
  getCategoryNameListRequest(): Observable<any> {
    return this.http.get<any>(this.root + '/allname');
  }

  getCategoriesByCity(name): Observable<any> {
    return this.http.get<any>(this.root + '/all/' + name);
  }

  getCategoryByNameRequest(categoryName: string): Observable<any> {
    return this.http.get<any>(this.root + '/name/' + categoryName);
  }
}

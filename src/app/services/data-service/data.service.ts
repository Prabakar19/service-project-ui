import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Customer } from 'src/app/models/customer';
import { Service } from 'src/app/models/service';
import { ServiceProvider } from 'src/app/models/service-provider';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public customer: Customer;
  public category: Category;
  public service: Service;
  public serviceProvider: ServiceProvider;
  constructor() {}
}

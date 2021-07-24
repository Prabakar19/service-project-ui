import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Service } from 'src/app/models/service';
import { CategoryServiceService } from 'src/app/services/category-service/category-service.service';
import { DataService } from 'src/app/services/data-service/data.service';
import { ServiceService } from 'src/app/services/service-service/service.service';

@Component({
  selector: 'app-list-services-page',
  templateUrl: './list-services-page.component.html',
  styleUrls: ['./list-services-page.component.css'],
})
export class ListServicesPageComponent implements OnInit {
  pageLoaded: boolean = false;
  category: Category;
  categoryName: string;
  location: string;
  categoryNameList;

  key: any = 'serviceId';
  reverse: boolean = false;
  filteredList;
  cost: number;

  servicesList: Array<any>;

  totalRecords: number;
  page: number;

  constructor(
    private router: Router,
    private service: ServiceService,
    private categoryService: CategoryServiceService
  ) {}

  ngOnInit(): void {
    this.categoryName = JSON.parse(sessionStorage.getItem('category'));
    this.location = JSON.parse(sessionStorage.getItem('location'));

    this.getServiceList();
    this.getCategoryList();
  }

  getServiceList() {
    this.categoryService.getCategoryByNameRequest(this.categoryName).subscribe(
      (res) => {
        this.category = res;
        this.service
          .getServiceList(this.category.categoryId, this.location)
          .subscribe(
            (res) => {
              console.log(res);
              this.servicesList = res;
              this.totalRecords = this.servicesList.length;
              this.filteredList = this.servicesList;
              console.log(this.servicesList);
              this.calculateDiscountCost();
              this.pageLoaded = true;
            },
            (err) => {
              console.log(err);
            }
          );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCategoryList() {
    this.categoryService.getCategoryNameListRequest().subscribe(
      (res) => {
        this.categoryNameList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  calculateDiscountCost() {
    for (let i = 0; i < this.filteredList.length; i++) {
      this.filteredList[i].discountedCost = Math.round(
        this.filteredList[i].cost -
          (this.filteredList[i].discount / 100) * this.filteredList[i].cost
      );
    }
  }

  selectedDataHandler(cat: string) {
    sessionStorage.setItem('category', JSON.stringify(cat));
    window.location.reload();
  }

  sortBy(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  filterUnder(cost) {
    console.log(cost);
    this.filteredList = this.servicesList.filter(
      (service) => service.discountedCost <= cost
    );
  }
  filterAbove(cost) {
    console.log(cost);
    this.filteredList = this.servicesList.filter(
      (service) => service.discountedCost >= cost
    );
  }

  gotoCheckout(service: Service) {
    sessionStorage.setItem('service', JSON.stringify(service));
    console.log(service);
    this.router.navigateByUrl('/checkout');
  }
}

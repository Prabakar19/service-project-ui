import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Customer } from 'src/app/models/customer';
import { Service } from 'src/app/models/service';
import { Transaction, TransDetails } from 'src/app/models/transaction';
import { BillingService } from 'src/app/services/billing-service/billing.service';
import { CategoryServiceService } from 'src/app/services/category-service/category-service.service';
import { DownloadServiceService } from 'src/app/services/download-service.service';
import { ServiceService } from 'src/app/services/service-service/service.service';

@Component({
  selector: 'app-my-booking-page',
  templateUrl: './my-booking-page.component.html',
  styleUrls: ['./my-booking-page.component.css'],
})
export class MyBookingPageComponent implements OnInit {
  pageLoaded: boolean = false;
  toggleList = ['Current', 'Completed'];
  visibleTxn: boolean = true;
  ratingStarValue: number = 0;
  customer: Customer;
  transactions: Transaction[];
  transDetails: TransDetails[];
  service: Service;
  currentList: Partial<Transaction>[] = [];
  completedList: Partial<Transaction>[] = [];

  ratingList: Array<number> = [];
  key: any = 'date';
  reverse: boolean = true;

  transactionHeader = [
    'transactionId',
    'serviceId',
    'billingId',
    'customerId',
    'status',
    'transactionRating',
    'transactionAmount',
    'originalCost',
    'date',
  ];
  categoryList: Category[];
  categoryNameList: string[];
  category;

  constructor(
    private billingService: BillingService,
    private serviceService: ServiceService,
    private downloadService: DownloadServiceService,
    private categoryService: CategoryServiceService
  ) {}

  ngOnInit(): void {
    this.customer = JSON.parse(localStorage.getItem('token'));
    this.getAllTransactions(this.customer.customerId);
    this.getCategoryList();
    for (let i = 1; i <= 5; i++) this.ratingList.push(i);
  }

  getCategoryList() {
    this.categoryService.getCategoryListRequest().subscribe(
      (res) => {
        this.categoryList = res;
        this.categoryNameList = this.categoryList.map(
          (cat) => cat.categoryName
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllTransactions(custId) {
    this.billingService.getServicesRequest(custId).subscribe(
      (res) => {
        this.transactions = res;
        this.splitTransaction(this.transactions);
        this.pageLoaded = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  splitTransaction = (transactions) => {
    transactions.map((trans) => {
      if (trans.status === 'ongoing') this.currentList.push(trans);
      else if (trans.status === 'completed') this.completedList.push(trans);
    });
  };

  getService($serviceId: number) {
    this.serviceService.getServiceByIdRequest($serviceId).subscribe(
      (res) => {
        this.service = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  selectedValueHandler(selectedValue: string) {
    if (selectedValue === 'Current') this.visibleTxn = true;
    else if (selectedValue === 'Completed') this.visibleTxn = false;
  }

  mouseOverHandler(rate: number) {
    this.ratingStarValue = rate;
  }

  updateRating(rate: number, transaction: Transaction) {
    this.pageLoaded = false;
    transaction.transactionRating = rate;
    this.billingService
      .updateTransactionRequest(transaction, transaction.transactionId)
      .subscribe(
        (res) => {
          console.log(res);
          this.pageLoaded = true;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  //filtered by category
  selectEventHandler(selected: string) {
    console.log(selected);
    //   for (let i = 0; i < this.categoryList.length; i++) {
    //     if (this.categoryList[i].categoryName === selected) {
    //       this.category = this.categoryList[i];
    //       break;
    //     }
    //   }
  }

  // filteredList(){
  //   this.transactions.filter(transaction => transaction.)
  // }

  //sorting transaction
  sortBy(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  downloadReport() {
    this.downloadService.downloadFile(
      this.completedList,
      'My bookings',
      this.transactionHeader
    );
  }
}

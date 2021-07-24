import { Component, OnInit } from '@angular/core';
import { Billing } from 'src/app/models/billing';
import { ServiceProviderService } from 'src/app/services/service-provider-service/service-provider.service';
@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css'],
})
export class ManageCustomersComponent implements OnInit {
  constructor(private serviceProviderService: ServiceProviderService) {}

  completeBillings: any;
  billings: Array<any>;
  temp: any;
  totalRecords: number;
  selectedToggle: String = 'ongoing';
  spId = 1;

  ngOnInit(): void {
    this.getServiceProviderBills();
  }

  accept(selected) {
    if (this.selectedToggle === 'ongoing') {
      console.log(selected._value);
      selected._value.forEach((element) => {
        console.log(element);
        this.serviceProviderService
          .updateTransactionStatusById(element, 'completed')
          .subscribe(
            (res) => {
              console.log(res);
              this.getServiceProviderBills();
            },
            (err) => {
              console.log(err);
            }
          );
      });
    } else if (this.selectedToggle === 'completed') {
      console.log(selected._value);
      selected._value.forEach((element) => {
        console.log(element);
        this.serviceProviderService
          .updateTransactionStatusById(element, 'ongoing')
          .subscribe(
            (res) => {
              console.log(res);
              this.getServiceProviderBills();
            },
            (err) => {
              console.log(err);
            }
          );
      });
    }
  }

  selectedValueHandler(selectedValue: string) {
    const tempBill = [];
    this.selectedToggle = selectedValue;
    console.log(this.billings);
    this.filterBillings();
    console.log(selectedValue);
  }

  filterBillings() {
    const tempBill = [];
    this.completeBillings.forEach((bill) => {
      const temp = bill.transactions.filter(
        (transaction) => transaction.status === this.selectedToggle
      );
      if (temp.length) {
        tempBill.push(bill);
      }
    });
    this.billings = tempBill.slice();
    this.billings.sort((a, b) =>
      a.billingId > b.billingId ? 1 : b.billingId > a.billingId ? -1 : 0
    );
    console.log(tempBill);
  }

  getServiceProviderBills() {
    console.log('hey');

    this.serviceProviderService.getServiceProviderRequest(this.spId).subscribe(
      (res) => {
        console.log(res);
        this.temp = res;
        this.billings = this.temp.billings;
        this.completeBillings = this.temp.billings;
        this.filterBillings();
        this.totalRecords = this.billings.length;
        console.log(this.billings);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

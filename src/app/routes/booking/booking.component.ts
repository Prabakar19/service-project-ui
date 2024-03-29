import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer';
import { Transaction } from 'src/app/models/transaction';
import { setLoading } from 'src/app/state/shared/shared.actions';
import { AppState } from 'src/app/state/state';
import { downloadReport, getAllTransactions, updateRating } from './state/booking.actions';
import { getTransactions } from './state/booking.selectors';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  toggleList = ['Current', 'Completed'];
  visibleTxn = true;
  ratingStarValue = 0;
  key = 'date';
  reverse = true;
  customer: Customer;
  transactions: Transaction[];
  currentList = [];
  completedList = [];
  ratingList: Array<number> = [1, 2, 3, 4, 5];

  transactions$: Observable<Transaction[]>;
  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppState>) {
    this.transactions$ = this.store.select(getTransactions);
  }

  ngOnInit(): void {
    this.customer = JSON.parse(localStorage.getItem('token'));
    // TODO - get customer from state
    this.getAllTransactions(this.customer.customerId);
  }

  getAllTransactions(custId) {
    this.store.dispatch(setLoading({ status: true }));
    this.store.dispatch(getAllTransactions({ custId }));
    this.transactions$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.transactions = res;
      this.splitTransaction(this.transactions);
    });
  }

  splitTransaction = (transactions) => {
    this.currentList = [];
    this.completedList = [];

    transactions.map((trans) => {
      switch (trans.status) {
        case 'ongoing':
          this.currentList.push(trans);
          break;
        case 'completed':
          this.completedList.push(trans);
          break;
      }
    });
  };

  selectedValueHandler(selectedValue: string) {
    if (selectedValue === 'Current') {
      this.visibleTxn = true;
    } else if (selectedValue === 'Completed') {
      this.visibleTxn = false;
    }
  }

  mouseOverHandler(rate: number) {
    this.ratingStarValue = rate;
  }

  updateRating(rate: number, txn: Transaction) {
    const transaction = cloneDeep(txn);
    transaction.transactionRating = rate;
    const rating = { rating: rate };
    this.store.dispatch(updateRating({ rating, txnId: transaction.transactionId }));
  }

  sortBy(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  downloadReport() {
    this.store.dispatch(downloadReport({ transactionList: this.completedList }));
  }
}

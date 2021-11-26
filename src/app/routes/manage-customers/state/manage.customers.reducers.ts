import { createReducer, on, Action } from '@ngrx/store';
import { ManageCustomerSate } from 'src/app/state/state';
import { getSPSuccess, udpateTransStatusSuccess } from './manage.customers.actions';
import { cloneDeep } from 'lodash';

export const initialState: ManageCustomerSate = {
  serviceProvider: null,
};

const _manageCustomerReducer = createReducer(
  initialState,
  on(getSPSuccess, (state, props) => ({
    ...state,
    serviceProvider: props.serviceProvider,
  })),
  on(udpateTransStatusSuccess, (state, props) => {
    const bills = cloneDeep(state.serviceProvider.billings);
    bills.map((bill) => {
      if (bill.billingId === props.transaction.billingId) {
        const trans = bill.transactions.filter((tran) => tran.transactionId !== props.transaction.transactionId);
        bill.transactions = [...trans, props.transaction];
      }
    });
    return { ...state, serviceProvider: { ...state.serviceProvider, billings: bills } };
  })
);

export function ManageCustomerReducer(state: any | undefined, action: Action) {
  return _manageCustomerReducer(state, action);
}

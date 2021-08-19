import { Action, createReducer, on } from '@ngrx/store';
import { getAllCategorySuccess, getAllTransactionsSuccess, updateRatingSuccess } from './booking.actions';

export const initialState = {
  transactions: [],
  categoryList: [],
};

const _bookingReducer = createReducer(
  initialState,
  on(getAllTransactionsSuccess, (state, props) => ({ ...state, transactions: props.transactions })),
  on(getAllCategorySuccess, (state, props) => ({ ...state, categoryList: props.categoryList })),
  on(updateRatingSuccess, (state, props) => {
    const txns = state.transactions.filter((txn) => txn.transactionId !== props.transaction.transactionId);
    return { ...state, transactions: [...txns, props.transaction] };
  })
);
export function bookingReducer(state: any | undefined, action: Action) {
  return _bookingReducer(state, action);
}

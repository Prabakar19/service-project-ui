import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category';
import { Transaction } from 'src/app/models/transaction';

export const getAllTransactions = createAction('[BOOKING] get All Transactions', props<{ custId }>());
export const getAllTransactionsSuccess = createAction('[BOOKING] get All Transactions Success', props<{ transactions: Transaction[] }>());
export const updateRating = createAction('[BOOKING] update Rating', props<{ transaction; txnId }>());
export const updateRatingSuccess = createAction('[BOOKING] update Rating Success', props<{ transaction }>());
export const downloadReport = createAction('[BOOKING] download report', props<{ transactionList }>());

import { createAction, props } from '@ngrx/store';
import { Address } from 'src/app/models/address';
import { Customer } from 'src/app/models/customer';
import { ServiceProvider } from 'src/app/models/service-provider';

export const custLogin = createAction('[CUST] Login', props<{ emailId: string; password: string }>());
export const custLoginSucess = createAction('[CUST] Login Success', props<{ customer: Customer }>());
export const custRegister = createAction('[CUST] Register', props<{ customer: Customer }>());
export const custRegisterSucess = createAction('[CUST] Register Success', props<{ customer: Customer }>());
export const addCustomerAddress = createAction('[CUST] Add Address', props<{ address: Address; customerId: number }>());
export const addCustomerAddressSucess = createAction('[CUST] Add Address Success', props<{ customer: Customer }>());
export const updateCust = createAction('[CUST] Update Customer', props<{ customer: Customer }>());
export const updateCustSucess = createAction('[CUST] Update Customer Success', props<{ customer: Customer }>());
export const updateCustAddress = createAction('[CUST] Update Customer Address', props<{ address: Address; addressId: number }>());
export const updateCustAddressSucess = createAction('[CUST] Update Customer Address Success', props<{ address: Address }>());
export const setCustomer = createAction('[CUST] Set Customer', props<{ customer }>());

export const spLogin = createAction('[SP] Login', props<{ emailId: string; password: string }>());
export const spLoginSucess = createAction('[SP] Login Success', props<{ serviceProvider: ServiceProvider }>());
export const spRegister = createAction('[SP] Register', props<{ serviceProvider: ServiceProvider }>());
export const spRegisterSucess = createAction('[SP] Register Success', props<{ serviceProvider: ServiceProvider }>());
export const addSPAddress = createAction('[SP] Add Address', props<{ serviceAddress: Address; spId: number }>());
export const addSPAddressSucess = createAction('[SP] Add Address Success', props<{ serviceProvider: ServiceProvider }>());

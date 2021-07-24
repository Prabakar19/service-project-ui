import { createAction, props } from '@ngrx/store';
import { Address } from 'src/app/models/address';
import { Customer } from 'src/app/models/customer';
import { ServiceProvider } from 'src/app/models/service-provider';

export enum EnviromentActions {
  CUST_LOGIN = '[CUST] Login',
  CUST_LOGIN_SUCCESS = '[CUST] Login Success',
  SP_LOGIN = '[SP] Login',
  SP_LOGIN_SUCCESS = '[SP] Login Success',

  CUST_REGISTER = '[CUST] Register',
  CUST_REGISTER_SUCCESS = '[CUST] Register Success',
  ADD_CUST_ADDRESS = '[CUST] Add Customer Address',
  ADD_CUST_ADDRESS_SUCCESS = '[CUST] Add Customer Address Success',

  SP_REGISTER = '[SP] Register',
  SP_REGISTER_SUCCESS = '[SP] Register Success',
}

export const custLogin = createAction(EnviromentActions.CUST_LOGIN, props<{ emailId: string; password: string }>());
export const custLoginSucess = createAction(EnviromentActions.CUST_LOGIN_SUCCESS, props<{ customer: Customer }>());

export const custRegister = createAction(EnviromentActions.CUST_REGISTER, props<{ customer: Customer }>());
export const custRegisterSucess = createAction(EnviromentActions.CUST_REGISTER_SUCCESS, props<{ customer: Customer }>());

export const addCustomerAddress = createAction(EnviromentActions.ADD_CUST_ADDRESS, props<{ address: Address; customerId: number }>());
export const addCustomerAddressSucess = createAction(EnviromentActions.ADD_CUST_ADDRESS_SUCCESS, props<{ customer: Customer }>());

export const spLogin = createAction(EnviromentActions.SP_LOGIN, props<{ emailId: string; password: string }>());
export const spLoginSucess = createAction(EnviromentActions.SP_LOGIN_SUCCESS, props<{ serviceProvider: ServiceProvider }>());

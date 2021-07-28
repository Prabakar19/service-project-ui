import { createAction, props } from '@ngrx/store';
import { Address } from 'src/app/models/address';
import { Customer } from 'src/app/models/customer';
import { ServiceProvider } from 'src/app/models/service-provider';

export const CUST_LOGIN = '[CUST] Login';
export const CUST_LOGIN_SUCCESS = '[CUST] Login Success';
export const CUST_REGISTER = '[CUST] Register';
export const CUST_REGISTER_SUCCESS = '[CUST] Register Success';
export const ADD_CUST_ADDRESS = '[CUST] Add Address';
export const ADD_CUST_ADDRESS_SUCCESS = '[CUST] Add Address Success';
export const SP_LOGIN = '[SP] Login';
export const SP_LOGIN_SUCCESS = '[SP] Login Success';
export const SP_REGISTER = '[SP] Register';
export const SP_REGISTER_SUCCESS = '[SP] Register Success';
export const ADD_SP_ADDRESS = '[SP] Add Address';
export const ADD_SP_ADDRESS_SUCCESS = '[SP] Add Address Success';

export const custLogin = createAction(CUST_LOGIN, props<{ emailId: string; password: string }>());
export const custLoginSucess = createAction(CUST_LOGIN_SUCCESS, props<{ customer: Customer }>());

export const custRegister = createAction(CUST_REGISTER, props<{ customer: Customer }>());
export const custRegisterSucess = createAction(CUST_REGISTER_SUCCESS, props<{ customer: Customer }>());

export const addCustomerAddress = createAction(ADD_CUST_ADDRESS, props<{ address: Address; customerId: number }>());
export const addCustomerAddressSucess = createAction(ADD_CUST_ADDRESS_SUCCESS, props<{ customer: Customer }>());

export const spLogin = createAction(SP_LOGIN, props<{ emailId: string; password: string }>());
export const spLoginSucess = createAction(SP_LOGIN_SUCCESS, props<{ serviceProvider: ServiceProvider }>());

export const spRegister = createAction(SP_REGISTER, props<{ serviceProvider: ServiceProvider }>());
export const spRegisterSucess = createAction(SP_REGISTER_SUCCESS, props<{ serviceProvider: ServiceProvider }>());

export const addSPAddress = createAction(ADD_SP_ADDRESS, props<{ serviceAddress: Address; spId: number }>());
export const addSPAddressSucess = createAction(ADD_SP_ADDRESS_SUCCESS, props<{ serviceProvider: ServiceProvider }>());

import { createReducer, on, Action } from '@ngrx/store';
import {
  addCustomerAddress,
  addCustomerAddressSucess,
  addSPAddress,
  addSPAddressSucess,
  custLogin,
  custLoginSucess,
  custRegister,
  custRegisterSucess,
  spLogin,
  spLoginSucess,
  spRegister,
  spRegisterSucess,
} from './auth.actions';

export const initialState = {
  customer: null,
  serviceProvider: null,
};

const _environmentReducer = createReducer(
  initialState,
  on(custLogin, (state, props) => state),
  on(custLoginSucess, (state, props) => ({
    ...state,
    customer: props.customer,
  })),
  on(custRegister, (state, props) => state),
  on(custRegisterSucess, (state, props) => ({
    ...state,
    customer: props.customer,
  })),
  on(addCustomerAddress, (state, props) => state),
  on(addCustomerAddressSucess, (state, props) => ({
    ...state,
    customer: props.customer,
  })),
  on(spLogin, (state, props) => state),
  on(spLoginSucess, (state, props) => ({
    ...state,
    serviceProvider: props.serviceProvider,
  })),
  on(spRegister, (state, props) => state),
  on(spRegisterSucess, (state, props) => ({
    ...state,
    serviceProvider: props.serviceProvider,
  })),
  on(addSPAddress, (state, props) => state),
  on(addSPAddressSucess, (state, props) => ({
    ...state,
    serviceProvider: props.serviceProvider,
  }))
);
export function environmentReducer(state: any | undefined, action: Action) {
  return _environmentReducer(state, action);
}

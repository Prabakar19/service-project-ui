import { createReducer, on } from '@ngrx/store';
import { setErrorMessage, setLoading } from './shared.actions';

const initalState = {
  showLoading: false,
  errorMessage: '',
};

const _sharedReducer = createReducer(
  initalState,
  on(setLoading, (state, props) => ({ ...state, showLoading: props.status })),
  on(setErrorMessage, (state, props) => ({ ...state, errorMessage: props.errorMsg }))
);

export function sharedReducer(state, action) {
  return _sharedReducer(state, action);
}

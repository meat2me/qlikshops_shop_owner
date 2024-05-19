import * as auth from './reducers/auth.reducer';
import * as store from './reducers/store.reducer';
import { createFeatureSelector } from '@ngrx/store';

export interface AppState {
    authState: auth.State;
    storeState: store.State;
}

export const reducers = {
    auth: auth.reducer,
    store: store.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectStoreState = createFeatureSelector<AppState>('store');






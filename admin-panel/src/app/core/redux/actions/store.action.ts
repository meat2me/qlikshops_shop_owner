import { Action } from '@ngrx/store';

export const GETSTORE = '[Store] Get Store';
export const GETSTORE_SUCCESS = '[Store] GetStore Success';
export const GETSTORE_FAILURE = '[Store] GetStore Failure';


export class GetStore implements Action {
    readonly type = GETSTORE;
    constructor(public payload: any) { }
}

export class GetStoreSuccess implements Action {
  readonly type = GETSTORE_SUCCESS;
  constructor(public payload: any) { }
}

export class GetStoreFailure implements Action {
  readonly type = GETSTORE_FAILURE;
  constructor(public payload: any) { }
}

// tslint:disable-next-line: max-line-length
export type All = GetStore | GetStoreSuccess | GetStoreFailure;

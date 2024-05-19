import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GETSTORE,
  GetStore,
  GetStoreSuccess,
  GetStoreFailure,
} from '../actions/store.action';

@Injectable()
export class StoreEffects {
  constructor(private actions: Actions) {}

  @Effect()
  GetStore: Observable<any> = this.actions.pipe(
    ofType(GETSTORE),
    map((action: GetStore) => action.payload),
    map((res: any) => {
      if (res) {
        return new GetStoreSuccess({ ...res });
      } else {
        return new GetStoreFailure({ error: 'get store error' });
      }
    })
  );
}

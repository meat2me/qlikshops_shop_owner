import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// tslint:disable-next-line: max-line-length
import { LOGIN, Login, LogInFailure, LogInSuccess, LOGOUT, REGISTRATION, Registration, RegistrationFailure, RegistrationSuccess } from '../actions/auth.action';
// tslint:disable-next-line: max-line-length
import { selectAuthState } from '../app.states';

@Injectable()
export class AuthEffects {
    constructor(
        private actions: Actions,
        private authService: AuthService,
        private router: Router,
        private store: Store<any>
    ) {
        this.store.select(selectAuthState).subscribe((state) => {
            // tslint:disable-next-line: no-string-literal
            if (state['isAuthenticated']) {
                // tslint:disable-next-line: no-string-literal
                this.user = state['user'];
            } else {
                this.user = null;
            }
        });

    }
    user;
    email;
    userId;

    @Effect()
    Login: Observable<any> = this.actions.pipe(
        ofType(LOGIN),
        map((action: Login) => action.payload),
        switchMap(payload => {
            return this.authService.logIn(payload.auth_key);
        }),
        map((user) => {
            // tslint:disable-next-line: no-string-literal
            if (user['message'] === 'success') {
                if (user['store_id']) {
                    localStorage.setItem('store_id', user['store_id']);
                }
                return new LogInSuccess({ ...user });
            } else {
                // tslint:disable-next-line: no-string-literal
                return new LogInFailure({ error: user['message'] });
            }
        })
    );

    @Effect()
    Registration: Observable<any> = this.actions.pipe(
        ofType(REGISTRATION),
        map((action: Registration) => action.payload),
        switchMap(payload => {
            return this.authService.registration({
                // tslint:disable-next-line: no-string-literal
                auth_key: payload['auth_key'],
                name: 'quy'
            });
        }),
        map((user) => {
            // tslint:disable-next-line: no-string-literal
            if (user['message'] === 'success') {
                return new RegistrationSuccess({ ...user });
            } else {
                // tslint:disable-next-line: no-string-literal
                return new RegistrationFailure({ error: user['message'] });
            }
        })
    );

    @Effect({ dispatch: false })
    public LogOut: Observable<any> = this.actions.pipe(
        ofType(LOGOUT),
        map(() => {
            this.authService.logout();
            this.router.navigate(['/auth/login']);
        })
    );
// tslint:disable-next-line: eofline
}

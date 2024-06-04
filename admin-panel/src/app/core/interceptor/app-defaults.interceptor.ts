import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Logout } from '@core/redux/actions/auth.action';

@Injectable()
export class AppDefaultsInterceptor implements HttpInterceptor {
    constructor(private store: Store<any>) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap((event) => {
                // tslint:disable-next-line: no-string-literal
                const body = event['body'];
                if (body && (body.rc === 102 || body.rc === 201) && body.message === 'invalid user token') {
                    this.store.dispatch(new Logout());
                } else if (body && body.rc > 0) {
                    this.showToast(body.message);
                }
            }),
        );
    }

    private showToast(message: string) {
        // this.toastrService.error(message);
    }
}

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, TimeoutError, of } from 'rxjs';
import { timeout, catchError, map } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';
import { MetaHttpParams } from '@models/meta-http-params.model';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    private requestTimeout = 120 * 1000;

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const params = request.params as MetaHttpParams;

        return next.handle(request).pipe(
            timeout(this.requestTimeout),
            catchError((event: HttpEvent<any>) => {
                if (!params.supressError) {
                    if (event instanceof TimeoutError) {
                        this.showToast('Request time out!');
                    } else if (event instanceof HttpErrorResponse) {
                        this.showToast(event.error.message);
                    } else {

                    }
                }
                return of(event);
            }),
        );
    }

    private showToast(message: string) {
        // this.toastrService.error(message);
    }
}

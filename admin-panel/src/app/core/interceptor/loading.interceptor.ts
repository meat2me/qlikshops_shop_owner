import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
// import { NgxSpinnerService } from 'ngx-spinner';
import { MetaHttpParams } from '@models/meta-http-params.model';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const params = request.params as MetaHttpParams;
        if (!params.preventLoading) {
            // this.ngxSpinnerService.show();
        }

        return next.handle(request).pipe(
            finalize(() => {
                if (!params.preventLoading && !params.keepLoading) {
                    // this.ngxSpinnerService.hide();
                }
            }),
        );
    }
}

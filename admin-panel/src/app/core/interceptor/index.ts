import { ClassProvider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { LoadingInterceptor } from './loading.interceptor';
import { AppDefaultsInterceptor } from './app-defaults.interceptor';

export const interceptors: ClassProvider[] = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AppDefaultsInterceptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorHandlerInterceptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingInterceptor,
        multi: true,
    },
];

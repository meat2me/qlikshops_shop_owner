import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';

export const REGISTRATION = '[Auth] Registration';
export const REGISTRATIONING = '[Auth] Registrationing';
export const REGISTRATION_SUCCESS = '[Auth] Registration Success';
export const REGISTRATION_FAILURE = '[Auth] Registration Failure';

export const REFRESH = '[Auth] Refresh';
export const REFRESH_SUCCESS = '[Auth] Refresh Success';
export const REFRESH_FAILURE = '[Auth] Refresh Failure';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: any) { }
}

export class LogInSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: any) { }
}

export class LogInFailure implements Action {
    readonly type = LOGIN_FAILURE;
    constructor(public payload: any) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
    constructor(public payload?: any) { }
}

export class Registration implements Action {
    readonly type = REGISTRATION;
    constructor(public payload: any) { }
}

export class Registrationing implements Action {
    readonly type = REGISTRATIONING;
    constructor() { }
}

export class RegistrationSuccess implements Action {
    readonly type = REGISTRATION_SUCCESS;
    constructor(public payload: any) { }
}

export class RegistrationFailure implements Action {
    readonly type = REGISTRATION_FAILURE;
    constructor(public payload: any) { }
}

export class Refresh implements Action {
    readonly type = REFRESH;
    constructor(public payload: any) { }
}

export class RefreshSuccess implements Action {
    readonly type = REFRESH_SUCCESS;
    constructor(public payload: any) { }
}

export class RefreshFailure implements Action {
    readonly type = REFRESH_FAILURE;
    constructor(public payload: any) { }
}

// tslint:disable-next-line: max-line-length
export type All = Login | Logout | LogInSuccess | LogInFailure | Registration | Registrationing | RegistrationSuccess | RegistrationFailure | Refresh | RefreshSuccess | RefreshFailure;

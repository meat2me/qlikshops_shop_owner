import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthState } from '@core/redux/app.states';

@Injectable()
export class AuthGuard implements CanActivate {

  public user;
  constructor(private _authService: AuthService, private _router: Router,
              private store: Store<any>) {
    this.store.select(selectAuthState).subscribe((state: any) => {
      if (state.isAuthenticated) {
        this.user = state;
      } else {
        this.user = null;
      }
    });
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // navigate to login page
    if (this.user) {
      return true;
    }

    this._router.navigate(['/auth/login']);
    return false;
  }

}

import { AlertService } from '@services/alert.service';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditDeactivateGuard implements CanDeactivate<any> {
  constructor(private alertServ: AlertService) { }
  canDeactivate(
    component: any,
    // currentRoute: ActivatedRouteSnapshot,
    // currentState: RouterStateSnapshot,
    // nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.canDeactivate()) { return true; }
    return this.alertServ.showDiscardChanges().then(() => true).catch(() => false);
  }

}

import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseService } from './base.service';
import { selectAuthState } from '@core/redux/app.states';
import { StoreService } from './store.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userType;
  constructor(private apiService: BaseService, protected store: Store<any>, private storeServ: StoreService) { }

  public sendNumber(countryCode, phone) {
    const body = {
      request: 'send_sms_code',
      phone_num: phone,
      country_code: countryCode
    };

    return this.apiService.post(body);
  }

  public verifySMSCode(countryCode, phone, verificationCode) {
    const body = {
      request: 'verify_sms_code',
      phone_num: phone,
      country_code: countryCode,
      verification_code: verificationCode
    };

    return this.apiService.post(body);
  }

  public logIn(authKey) {
    const body = {
      request: 'login_with_phone',
      auth_key: authKey,
      os_type: 3
    };

    return this.apiService.post(body);
  }

  public registration(user) {
    const body = {
      request: 'register_with_phone',
      auth_key: user.auth_key,
      name: user.name,
      os_type: 3
    };
    return this.apiService.post(body);
  }

  public logout() {
    const body = {
      request: 'logout'
    };
    return this.apiService.post(body);
  }

  public getOwnProfile(token?) {
    const body = {
      request: 'get_own_profile'
    };

    if (token) {
      return this.apiService.post({ ...body, token });
    } else {
      return this.apiService.post(body);
    }
  }
  public getUserType() {
    let userType;
    this.store.select(selectAuthState).subscribe((state: any) => {
      if (state.user_type) {
        userType = state.user_type;
      }
    });
    return userType;
  }

  // ba6178384a3ec2ac82a80f946038608f90bc98625cf0c35d4b190165826e33d2 admin
  public isAdmin() {
    if (this.getUserType() === 1) {
      return true;
    }
    return false;
  }
}

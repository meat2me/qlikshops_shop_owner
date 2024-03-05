import { selectStoreState } from './../../../core/redux/app.states';
import { TranslatedService } from '@services/translated.service';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { SmsVerificationModalComponent } from '@modals/sms-verification-modal/sms-verification-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '@services/auth.service';
import { Store } from '@ngrx/store';
import { selectAuthState } from '@core/redux/app.states';
import { Router } from '@angular/router';
import { StoreService } from '@services/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  phoneNumber: FormControl;
  errors;
  store_id;
  isLogin;
  stores;
  constructor(
    private modalService: NgbModal,
    private authSer: AuthService,
    private store: Store<any>,
    private router: Router,
    private renderer: Renderer2,
    private tranServ: TranslateService,
    private translatedServ: TranslatedService,
    private storeServ: StoreService
  ) {

    this.phoneNumber = new FormControl('', [Validators.required]);
  }

  ngOnInit(): void {
    this.store.select(selectAuthState).subscribe((state) => {
      // tslint:disable-next-line: no-string-literal
      if (state['isAuthenticated']) {
        this.translatedServ.storedLanguage = 'he';
        this.storeServ.getStoreInfo(this.store_id).subscribe((res) => {
          this.translatedServ.storedLanguage = 'he';
        });
        if (this.authSer.getUserType() === 3) {
          this.router.navigate(['/home/owner-page']);
        }
        else if (this.authSer.getUserType() === 1) {
          this.router.navigate(['/home/admin-page']);
        }
        else {
        }

      }
    });
    this.tranServ.onLangChange.subscribe(this.changeLayout.bind(this));
  }

  private changeLayout() {
    const currLang = this.translatedServ.storedLanguage;
    this.renderer.setAttribute(document.querySelector('html'), 'lang', currLang);
  }

  sendPhone() {
    let phone;
    let countryCode;
    if (this.phoneNumber.valid) {
      phone = this.phoneNumber.value;
      this.authSer.sendNumber(countryCode, phone).subscribe((res: any) => {
        if (res.rc === 0) {
          const modalRef = this.modalService.open(SmsVerificationModalComponent, {
            centered: true,
          });
          const component = modalRef.componentInstance as SmsVerificationModalComponent;
          component.countryCode = countryCode;
          component.phone = phone;
        }
      });
    } else {
      this.errors = 'Invalid Phone Number';
    }
  }
}

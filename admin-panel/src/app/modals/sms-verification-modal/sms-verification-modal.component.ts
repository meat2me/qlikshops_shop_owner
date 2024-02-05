import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '@services/alert.service';
import { AuthService } from '@services/auth.service';
import { Store } from '@ngrx/store';
import { Login } from '@core/redux/actions/auth.action';

@Component({
  selector: 'app-sms-verification-modal',
  templateUrl: './sms-verification-modal.component.html',
  styleUrls: ['./sms-verification-modal.component.scss']
})
export class SmsVerificationModalComponent implements OnInit {

  @Input() countryCode;
  @Input() phone;

  verifyCode;
  isLogin;

  constructor(
    public activeModal: NgbActiveModal,
    private authSer: AuthService,
    private alertSer: AlertService,
    private store: Store<any>
  ) { }

  ngOnInit(): void {
  }

  verify() {
    this.authSer.verifySMSCode(this.countryCode, this.phone, this.verifyCode).subscribe((res: any) => {
      if (res.rc == 0) {
        if (res.is_registered) {
          this.store.dispatch(new Login(res));
        } else {
          this.alertSer.showAlert('modal.verification_failed_title', 'modal.verification_failed_content');
        }
      }
    },
      err => {
        if (err) {
          this.alertSer.showAlert('modal.verification_failed_title', 'modal.verification_failed_content');
        }
      }
    );
    this.activeModal.close(true);
  }
  resend() {
    this.authSer.sendNumber(this.countryCode, this.phone).subscribe((response) => {
      // tslint:disable-next-line: no-string-literal
      if (response['rc'] === 0) {
        // this.toastrService.info('SMS code has been sent');
      }
    });
  }
}

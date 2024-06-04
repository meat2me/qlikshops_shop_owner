import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { NotifyModalComponent } from './notify-modal/notify-modal.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { SmsVerificationModalComponent } from './sms-verification-modal/sms-verification-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    NotifyModalComponent,
    AlertModalComponent,
    SmsVerificationModalComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
  ],
  entryComponents: [ConfirmModalComponent]
})
export class ModalModule { }

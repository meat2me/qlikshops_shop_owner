import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailComponent } from './order-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from '@modals/modal.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [OrderDetailComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ModalModule,
    RouterModule,
    NgbModalModule,
    ReactiveFormsModule,
  ]
})
export class OrderDetailModule { }

import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDetailComponent } from './client-detail.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [ClientDetailComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
  ]
})
export class ClientDetailModule { }

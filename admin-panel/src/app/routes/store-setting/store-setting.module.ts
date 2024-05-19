import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreSettingComponent } from './store-setting.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from '@modals/modal.module';
import { NgbModalModule, NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: StoreSettingComponent
  }
];

@NgModule({
  declarations: [StoreSettingComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    ModalModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class StoreSettingModule { }

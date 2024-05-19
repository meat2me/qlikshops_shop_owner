import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreSettingM2mComponent } from './store-setting-m2m.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from '@modals/modal.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageInputModule } from '@components/image-input/image-input.module';

const routes: Routes = [
  {
    path: '',
    component: StoreSettingM2mComponent
  }
];

@NgModule({
  declarations: [StoreSettingM2mComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    ModalModule,
    ReactiveFormsModule,
    ImageInputModule,
    RouterModule.forChild(routes)
  ]
})
export class StoreSettingM2mModule { }

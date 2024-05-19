import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStoreComponent } from './add-store.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from '@modals/modal.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  {
    path: '',
    component: AddStoreComponent
  }
];

@NgModule({
  declarations: [AddStoreComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgSelectModule,
    NgbModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
})
export class AddStoreModule { }

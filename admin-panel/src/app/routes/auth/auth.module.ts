import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from '@modals/modal.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
      path: 'login',
      component: LoginComponent
  },
];

@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ModalModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }

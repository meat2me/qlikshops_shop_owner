import { EditDeactivateGuard } from '@core/guards/edit-deactivate.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingComponent } from './account-setting.component';
import { Route, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Route[] = [
  { path: '', component: AccountSettingComponent, canDeactivate: [EditDeactivateGuard] },
];

@NgModule({
  declarations: [AccountSettingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [EditDeactivateGuard]
})
export class AccountSettingModule { }

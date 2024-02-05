import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { RouterModule } from '@angular/router';
import { LeftSideNavbarModule } from '@components/left-side-navbar/left-side-navbar.module';
import { NavbarModule } from '@components/navbar/navbar.module';



@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    LeftSideNavbarModule,
    NavbarModule
  ]
})
export class MainLayoutModule { }

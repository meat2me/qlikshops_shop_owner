import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnglishLayoutComponent } from './english-layout/english-layout.component';
import { HebrewLayoutComponent } from './hebrew-layout/hebrew-layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [EnglishLayoutComponent, HebrewLayoutComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LanguagesLayoutModule { }

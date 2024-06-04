import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesSelectedComponent } from './cities-selected.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageInputModule } from '@components/image-input/image-input.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [CitiesSelectedComponent],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    ImageInputModule
  ],
  exports: [CitiesSelectedComponent],
  entryComponents: [CitiesSelectedComponent],
})
export class CitiesSelectedModule { }

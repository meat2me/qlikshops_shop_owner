import { ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from '@core/directive/directive.module';
import { ImageInputComponent } from './image-input.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { Ng2ImgMaxModule } from 'ng2-img-max';

const components = [ImageInputComponent];
@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectiveModule,
    // Ng2ImgMaxModule,
  ],
  exports: [...components],
})
export class ImageInputModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRecipeComponent } from './add-recipe.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageInputModule } from '@components/image-input/image-input.module';



@NgModule({
  declarations: [AddRecipeComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    ImageInputModule
  ],
  exports: [AddRecipeComponent],
  entryComponents: [AddRecipeComponent],
})
export class AddRecipeModule { }

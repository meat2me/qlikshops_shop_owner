import { ReactiveFormsModule } from '@angular/forms';
import { AddCategoryModalComponent } from './add-category.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageInputModule } from '@components/image-input/image-input.module';
import { TreeInputModule } from '@components/tree-input/tree-input.module';



@NgModule({
  declarations: [AddCategoryModalComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    ImageInputModule,
    TreeInputModule,
  ],
  exports: [AddCategoryModalComponent],
  entryComponents: [AddCategoryModalComponent],
})
export class AddCategoryModalModule { }

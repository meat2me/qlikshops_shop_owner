import { ModalModule } from '@modals/modal.module';
import { DirectiveModule } from '@core/directive/directive.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageInputModule } from '@components/image-input/image-input.module';
import { TreeInputModule } from '@components/tree-input/tree-input.module';
import { NgbAccordionModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentAddItemComponent } from './content-add-item.component';



@NgModule({
  declarations: [ContentAddItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    NgSelectModule,
    NgbAccordionModule,
    NgbModalModule,
    ModalModule,
    ImageInputModule,
    TreeInputModule,
    DirectiveModule,
  ],


  exports: [
    ContentAddItemComponent,
  ]
})
export class ContentAddItemModule { }

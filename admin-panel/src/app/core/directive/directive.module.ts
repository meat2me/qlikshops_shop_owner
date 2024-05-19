import { TrueFalseValueDirective } from './true-false.directive';
import { DndDirective } from './dnd.directive';
import { NgModule } from '@angular/core';
import { ExportDirective } from './export.directive';
import { UploadDirective } from './upload.directive';


const directives = [
  ExportDirective,
  UploadDirective,
  DndDirective,
  TrueFalseValueDirective,
];

@NgModule({
  declarations: directives,
  exports: directives,
})
export class DirectiveModule { }

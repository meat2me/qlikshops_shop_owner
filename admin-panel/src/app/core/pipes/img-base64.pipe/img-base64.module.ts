import { NgModule } from '@angular/core';
import { ImgBase64Pipe } from './img-base64.pipe';

@NgModule({
  declarations: [ImgBase64Pipe],
  exports: [ImgBase64Pipe],
})
export class ImgBase64Module { }

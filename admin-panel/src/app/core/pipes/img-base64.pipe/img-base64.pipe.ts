import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgBase64'
})
export class ImgBase64Pipe implements PipeTransform {
  public static Prefix = 'data:image/*;base64,';
  transform(value: string, ...args: unknown[]): unknown {
    if (value.startsWith('/')) {
      return ImgBase64Pipe.Prefix + value;
    }
    return value;
  }

}

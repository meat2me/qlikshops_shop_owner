import {
  Directive,
  Output,
  Input,
  HostListener,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[appUpload]',
})
export class UploadDirective {
  @Input() accept = '';
  @Input() errorMsg = 'File is not supported';
  @Output() onFiles = new EventEmitter<FileList>();
  @Output() onError = new EventEmitter<Error>();
  constructor() {}

  @HostListener('change', ['$event'])
  async onClick($event: any) {
    const files = $event.target.files;
    try {
      if (this.validate(files)) {
        this.onFiles.emit(files);
      } else {
        throw Error(this.errorMsg);
      }
    } catch (err) {
      $event.target.value = '';
      this.onError.emit(err);
    }
  }

  private validate(files: FileList): boolean {
    let accepted = true;
    if (this.accept.trim()) {
      const regexps = this.accept
        .replace(/\s/g, '')
        .split(',')
        .map((accept) => new RegExp(accept.replace('*', '.*')));

      for (const file of Array.from(files)) {
        accepted = regexps.findIndex((regex) => regex.test(file.type)) !== -1;
      }
    }
    return accepted;
  }
}

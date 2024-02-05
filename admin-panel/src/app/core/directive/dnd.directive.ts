import {
  Directive,
  HostListener,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appDnd]',
})
export class DndDirective {
  @Input() accept = '';
  @Input() preventBodyDrop = true;

  @Output() onDragging = new EventEmitter();
  @Output() onFileDrop = new EventEmitter();
  @Output() onError = new EventEmitter();
  constructor() {}
  private validate(files: FileList): boolean {
    let accepted = true;
    if (this.accept.trim()) {
      const regexps = this.accept
        .replace(/\s/g, '')
        .split(',')
        .map((accept) => new RegExp(accept.replace('*', '.*')));

      for (const file of Array.from(files)) {
        accepted = regexps.findIndex((regex) => regex.test(file.type)) !== -1;
        if (!accepted) {
          throw Error('File not supported');
        }
      }
    }
    return accepted;
  }
  @HostListener('dragover', ['$event'])
  onDragOver(ev: DragEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    this.onDragging.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(ev: DragEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    this.onDragging.emit(false);
  }

  @HostListener('drop', ['$event'])
  onDrop(ev: DragEvent) {
    ev.preventDefault();
    ev.stopPropagation();

    try {
      const files = ev.dataTransfer.files;
      if (files.length) {
        this.validate(files);
        this.onFileDrop.emit(files);
      }
    } catch (err) {
      this.onError.emit(err);
    }
  }

  @HostListener('body:dragover', ['$event'])
  onBodyDragOver(ev: DragEvent) {
    if (this.preventBodyDrop) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  }

  @HostListener('body:drop', ['$event'])
  onBodyDrop(event: DragEvent) {
    if (this.preventBodyDrop) {
      event.preventDefault();
    }
  }
}

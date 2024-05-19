import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { ExportService } from '@services/export.service';

@Directive({
  selector: '[appExport]'
})
export class ExportDirective {

  constructor(private exportService: ExportService) { }

  @Input('appExport') documents: any[];
  @Input() fileName = 'data';

  @HostListener('click', ['$event']) onClick() {
    // this.exportService.exportExcel(this.documents, this.fileName);
  }
}

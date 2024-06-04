import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from '@services/language.service';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-table-footer',
  templateUrl: './table-footer.component.html',
  styleUrls: ['./table-footer.component.scss']
})
export class TableFooterComponent implements OnInit {

  @Input() tableOptions: PaginationInstance;
  @Input() items: any[];
  @Input() maxSize = 6;

  get remainEntries() {
    return this.items.length % this.tableOptions.itemsPerPage;
  }

  constructor(private langServ: LanguageService) { }

  ngOnInit(): void {
  }

 get isRTL() {
    return this.langServ.isRtl;
  }
}

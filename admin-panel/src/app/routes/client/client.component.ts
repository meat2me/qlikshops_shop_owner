import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

import { Client } from '@models/clients.model';
import { ClientService } from '@services/client.service';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  tableOptions: PaginationInstance;
  data: Client[];
  searchTerm = '';
  constructor(
    private route: ActivatedRoute,
    private clientServ: ClientService
  ) {
    this.tableOptions = {
      id: 'table',
      currentPage: 0,
      itemsPerPage: 10,
    };
  }
  currency;

  ngOnInit(): void {
    this.currency = localStorage.getItem('CURRENCY');
    this.data = this.route.snapshot.data.clients;
  }

  public onSearch() {
    this.clientServ
      .getClients(this.searchTerm.trim())
      .pipe(map((res) => res.clients))
      .subscribe((clients) => {
        this.data = clients;
      });
  }

  public onClear() {
    this.searchTerm = '';
    this.onSearch();
  }

  public trackById(c: Client) {
    return c.client_id;
  }
}

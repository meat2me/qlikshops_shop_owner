import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Client } from '@models/clients.model';
import { ClientService } from '@services/client.service';
@Injectable({
  providedIn: 'root',
})
export class ClientsResolver implements Resolve<Client[]> {
  constructor(private clientServ: ClientService) { }

  resolve() {
    return this.clientServ.getClients()
      .pipe(map(res => res.clients));
  }
}

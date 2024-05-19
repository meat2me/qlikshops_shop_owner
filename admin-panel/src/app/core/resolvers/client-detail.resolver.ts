import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

import { ClientDetail } from '@models/client-detail.model';
import { ClientService } from '@services/client.service';
@Injectable({
  providedIn: 'root',
})
export class ClientDetailResolver implements Resolve<ClientDetail> {
  constructor(private clientServ: ClientService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.clientServ.getClient(route.params.id);
  }
}


import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { ItemService } from '@services/item.service';
import { OwnerItemDetail } from '@models/owner-item-detail.model';
@Injectable({
  providedIn: 'root',
})
export class ContentItemDetailResolver implements Resolve<OwnerItemDetail> {
  constructor(private itemServ: ItemService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params.id;
    return this.itemServ.getOwnerItem(id).pipe(tap(res => res.item_id = +id));
  }
}

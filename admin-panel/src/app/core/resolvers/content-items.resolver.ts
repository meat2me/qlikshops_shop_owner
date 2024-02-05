import { ItemService } from '../../services/item.service';

import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { OwnerItem } from '@models/owner-item.model';
// @Injectable({
//   providedIn: 'root',
// })
export class ContentItemsResolver implements Resolve<OwnerItem[]> {
  constructor(private itemServ: ItemService) { }

  resolve() {
    return this.itemServ.getOwnerItems()
      .pipe(map(res => res.items));
  }
}

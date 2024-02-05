import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ItemConvertedValidValues } from '@models/item-valid.value.model';
import { ItemService } from '@services/item.service';

@Injectable({
  providedIn: 'root',
})
export class ItemValidValuesResolver implements Resolve<ItemConvertedValidValues> {
  constructor(private itemServ: ItemService) { }

  resolve() {
    return this.itemServ.getItemValidValues();
  }
}

import { ValidValues } from '@models/owner-item-detail.model';
import { map, tap } from 'rxjs/operators';
import { ItemConvertedValidValues } from '@models/item-valid.value.model';
import { Injectable, EventEmitter } from '@angular/core';
import { BaseService } from './base.service';
import { OwnerItems } from '@models/owner-item.model';
import { OwnerItemDetail } from '@models/owner-item-detail.model';
import { ItemValidValues } from '@models/item-valid.value.model';
import { Resp } from '@models/resp.model';
import { Observable, ReplaySubject } from 'rxjs';
import { fromObjWithNum } from 'app/utils/from-obj';
import { GetStore } from '@core/redux/actions/store.action';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends BaseService {
  private ownerItemsSubj = new ReplaySubject<OwnerItems>(1);
  private itemValidValuesSubj = new ReplaySubject<ItemConvertedValidValues>(1);

  public ownerItems$: Observable<OwnerItems>;
  public itemValidValues$: Observable<ItemConvertedValidValues>;

  getOwnerItem(item_id: number, store_id?) {
    let storeId;
    this.store_id == null ? storeId = store_id : storeId = this.store_id;
    return this.post<OwnerItemDetail>({ item_id, request: 'owner_get_item', store_id: storeId }).pipe(tap(res => {
      res.valid_values = this.convertValidValue(res.valid_values as ValidValues);
    }));
  }

  getOwnerItems(store_id?) {
    let storeId;
    this.store_id == null ? storeId = store_id : storeId = this.store_id;
    this.post<OwnerItems>({ request: 'owner_get_items', store_id: storeId }).subscribe(
      (res) => this.ownerItemsSubj.next(res),
      err => this.ownerItemsSubj.error(err),
    );
    return this.ownerItems$ || (this.ownerItems$ = this.ownerItemsSubj.asObservable());
  }

  getAdminItem(item_id: number) {
    return this.post<OwnerItemDetail>({ item_id, request: 'admin_get_item' }).pipe(tap(res => {
      res.valid_values = this.convertValidValue(res.valid_values as ValidValues);
    }));
  }

  getAdminItems() {
    this.post<OwnerItems>({ request: 'admin_get_items' }).subscribe(
      (res) => this.ownerItemsSubj.next(res),
      err => this.ownerItemsSubj.error(err),
    );
    return this.ownerItems$ || (this.ownerItems$ = this.ownerItemsSubj.asObservable());
  }

  getItemValidValues() {
    this.post<ItemValidValues>({ request: 'get_item_valid_values' })
      .pipe(map(this.convertValidValue))
      .subscribe(this.itemValidValuesSubj);
    return this.itemValidValues$ || (this.itemValidValues$ = this.itemValidValuesSubj.asObservable());
  }

  addItem(req: IAddItemReq) {
    return this.post<Resp>({ ...req, request: 'add_item' });
  }

  updateItem(req: IUpdateItemReq) {
    return this.post<Resp>({ ...req, request: 'update_item' });
  }

  deleteItem(item_id) {
    return this.post<Resp>({ request: 'delete_item', item_id })
  }

  setStoreItem(req: IUpdateItemReq, store_id?) {
    let storeId;
    this.store_id == null ? storeId = store_id : storeId = this.store_id;
    return this.post<Resp>({ ...req, request: 'set_store_item', store_id: storeId });
  }

  setOwnerItemInStock(req: ISetItemInStockReq, store_id?) {
    let storeId;
    this.store_id == null ? storeId = store_id : storeId = this.store_id;
    return this.post({ ...req, request: 'owner_set_item_in_stock', store_id: storeId });
  }

  setAdminItemInStock(req: ISetItemInStockReq) {
    return this.post({ ...req, request: 'admin_set_item_in_stock' });
  }

  private convertValidValue(o: ValidValues) {
    const a = o as unknown as ItemConvertedValidValues;
    a.promotion_templates = fromObjWithNum(o.promotion_templates);
    a.units = fromObjWithNum(o.units);
    return a;
  }
}

export interface ISetItemInStockReq {
  item_id: number;
  is_in_stock: boolean;
}

export type ShowCarouselType = 0 | 1 | 2 | 3;

export type ShowSidebarType = ShowCarouselType;

export interface ICategory {
  category_id: string;
}
export interface IImage {
  image_name: string;
  image: string;
}

export interface IAddItemReq {
  name: string;
  unit: number;
  description: string;
  catalog_number: string;
  price: number;
  sale_price: number;
  member_price: number;
  available_amount: number;
  limit_purchase_amount: number;
  alert_below: number;
  link_to_manufacturer_site: string;
  show_carousel: ShowCarouselType;
  show_sidebar: ShowSidebarType;
  promo_image: string;
  promo_image_name: string;
  is_in_stock: boolean;
  categories: ICategory[];
  images: IImage[];
}

export interface IUpdateItemReq extends Omit<IAddItemReq, 'images'> {
  item_id: number;
  image: IImage;
}

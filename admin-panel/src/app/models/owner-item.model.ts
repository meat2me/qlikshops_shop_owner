import { Resp } from './resp.model';
// Generated by https://quicktype.io

export interface OwnerItems extends Resp {
  items: OwnerItem[];
}

export interface OwnerItem {
  item_id: number;
  name: string;
  is_in_stock: boolean;
  category_name: string;
  image: string;
  is_available: number;
  price: number;
  categories: [{
    category_id: number;
    category_name: string;
  }];
}

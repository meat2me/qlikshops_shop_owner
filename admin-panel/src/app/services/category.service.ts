import { ReplaySubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Categories } from '@models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {
  categoriesSubj = new ReplaySubject<Categories>(1);
  categories$: Observable<Categories>;

  getCategories(store_id?) {
    let storeId;
    this.store_id == null ? storeId = store_id : storeId = this.store_id;
    return this.post<Categories>({ request: 'get_categories', store_id: storeId });
  }

  getAdminCategories(){
    this.post<Categories>({ request: 'admin_get_categories' }).subscribe(this.categoriesSubj);
    return this.categories$ || (this.categories$ = this.categoriesSubj.asObservable());
  }

  getPubCategories(req: IGetPubCategoriesReq) {
    return this.post<Categories>({ ...req, request: 'get_categories_pub' });
  }

  getSubPubCategories(req: IGetSubPubCategoriesReq) {
    return this.post({ ...req, request: 'get_sub_categories' });
  }

  getSubCategories(req: IGetSubCategoriesReq) {
    return this.post({ ...req, request: 'get_sub_categories' });
  }

  addCategories(req: IAddCategoryReq) {
    return this.post({ ...req, request: 'add_category' });
  }

  moveCategory(req: IMoveCategoryReq) {
    return this.post({ ...req, request: 'move_category' });
  }

  updateCategory(req: IUpdateCategoryReq) {
    return this.post({ ...req, request: 'update_category' });
  }

  deleteCategory(category_id: number) {
    return this.post({ category_id, request: 'delete_category' });
  }
}

export interface IGetPubCategoriesReq {
  store_id: string;
  root_category?: number;
}

export interface IAddCategoryReq {
  name: string;
  parent_category_id: number;
  image: string;
  image_name: string;
}

export interface IGetSubCategoriesReq {
  parent_category_id: number;
}

export interface IGetSubPubCategoriesReq {
  store_id: string;
  parent_category_id: number;
}

export interface IMoveCategoryReq {
  category_id: number;
  // 1 = Move Up, 2 = Move Down
  direction: 1 | 2;
}

export interface IUpdateCategoryReq {
  category_id: number;
  name: string;
  parent_category_id: number;
  image?: string;
  image_name?: string;
}

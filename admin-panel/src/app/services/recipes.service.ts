import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService extends BaseService {

  recipesSubj = new ReplaySubject<any>(1);
  recipes$: Observable<any>;

  getAdminRecipes() {
    this.post<any>({ request: 'admin_get_recipes' }).subscribe(this.recipesSubj);
    return this.recipes$ || (this.recipes$ = this.recipesSubj.asObservable());
  }

  addRecipes(req) {
    return this.post({ ...req, request: 'add_recipe' });
  }

  deleteRecipes(recipe_id: number) {
    return this.post({ recipe_id: recipe_id, request: 'delete_recipe' });
  }

  getRecipes(recipe_id: number) {
    return this.post({ recipe_id: recipe_id, request: 'get_recipe' });
  }

  updateRecipes(req) {
    return this.post({ ...req, request: 'update_recipe' });
  }
}

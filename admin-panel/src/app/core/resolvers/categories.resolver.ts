
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map } from 'rxjs/operators';
import { CategoryService } from '@services/category.service';
import { Category } from '@models/category.model';
import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesResolver implements Resolve<Category[]> {
  constructor(private catServ: CategoryService, private authServ: AuthService) { }

  resolve() {
    if (this.authServ.isAdmin()) {
      return this.catServ.getAdminCategories().pipe((map(r => r.categories)));
    } else {
      return this.catServ.getCategories().pipe((map(r => r.categories)));
    }

  }
}

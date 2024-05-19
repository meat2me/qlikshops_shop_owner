import { CategoriesResolver } from './../../core/resolvers/categories.resolver';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCategoryModalModule } from '@modals/add-category/add-category.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { Route, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryListModule } from '@components/category-list/category-list.module';

const routes: Route[] = [
  {
    path: '',
    component: CategoryComponent,

  }
];


@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CategoryListModule,
    TranslateModule,
    AddCategoryModalModule,
    NgbModalModule,

  ],
})
export class CategoryModule { }

import { AddRecipeModule } from './../../modals/add-recipe/add-recipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { AddCategoryModalModule } from '@modals/add-category/add-category.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryListModule } from '@components/category-list/category-list.module';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent
  }
];

@NgModule({
  declarations: [RecipesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    AddRecipeModule,
    NgbModalModule,
    CategoryListModule
  ]
})
export class RecipesModule { }

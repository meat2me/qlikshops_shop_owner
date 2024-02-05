import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentItemComponent } from '@routes/content-item/content-item.component';
import { ContentAddItemComponent } from '@routes/content-add-item/content-add-item.component';
import { ItemValidValuesResolver } from '@core/resolvers/item-valid-values.resolver';
import { CategoriesResolver } from '@core/resolvers/categories.resolver';
import { EditDeactivateGuard } from '@core/guards/edit-deactivate.guard';
import { ContentAddItemModule } from '@routes/content-add-item/content-add-item.module';
import { ContentItemModule } from '@routes/content-item/content-item.module';

const routes: Routes = [
  {
    path: '',
    component: ContentItemComponent,
  },
  {
    path: 'items/add-item',
    component: ContentAddItemComponent,
    resolve: {
      validValues: ItemValidValuesResolver,
      categories: CategoriesResolver,
    },
    canDeactivate: [EditDeactivateGuard],
    data: {
      breadcrumb: 'navigation.add_item'
    }
  },
  {
    path: 'items/edit-item/:id',
    component: ContentAddItemComponent,
    resolve: {
      // validValues: ItemValidValuesResolver,
      // categories: CategoriesResolver,
      // item: ContentItemDetailResolver,
    },
    canDeactivate: [EditDeactivateGuard],
    data: {
      breadcrumb: 'navigation.edit_item'
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ContentItemModule,
    ContentAddItemModule,
  ],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }

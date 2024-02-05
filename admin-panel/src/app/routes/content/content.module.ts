import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentItemModule } from '@routes/content-item/content-item.module';

const routes: Route[] = [
  {
    path: 'items/:location',
    loadChildren: () => import('@routes/content-item/content-item.module').then(m => m.ContentItemModule),
    data: {
      breadcrumb: 'navigation.items'
    }
  },
  // {
  //   path: 'items/add-item',
  //   component: ContentAddItemComponent,
  //   resolve: {
  //     validValues: ItemValidValuesResolver,
  //     categories: CategoriesResolver,
  //   },
  //   canDeactivate: [EditDeactivateGuard]
  // },
  // {
  //   path: 'items/edit-item/:id',
  //   component: ContentAddItemComponent,
  //   resolve: {
  //     // validValues: ItemValidValuesResolver,
  //     // categories: CategoriesResolver,
  //     // item: ContentItemDetailResolver,
  //   },
  //   canDeactivate: [EditDeactivateGuard]
  // },
  {
    path: 'categories/:location',
    loadChildren: () => import('@routes/category/category.module').then(mod => mod.CategoryModule),
    data: {
      breadcrumb: 'navigation.categories'
    }
  },
  {
    path: 'notification/:location',
    data: {
      breadcrumb: 'navigation.notifications',
    },
    loadChildren: () => import('@routes/notification/notification.module').then(mod => mod.NotificationModule)
  },
  {
    path: 'recipes/:location',
    data: {
      breadcrumb: 'navigation.recipes',
    },
    loadChildren: () => import('@routes/recipes/recipes.module').then(mod => mod.RecipesModule)
  },
  // { path: '', redirectTo: 'items' },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    // ContentItemEditGuard,
  ],
})
export class ContentModule { }

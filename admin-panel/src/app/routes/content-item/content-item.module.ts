import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectiveModule } from '@core/directive/directive.module';
import { ContentItemComponent } from './content-item.component';
import { TableFooterModule } from '@components/table-footer/table-footer.module';
import { ContentAddItemComponent } from '@routes/content-add-item/content-add-item.component';
import { ItemValidValuesResolver } from '@core/resolvers/item-valid-values.resolver';
import { CategoriesResolver } from '@core/resolvers/categories.resolver';
import { EditDeactivateGuard } from '@core/guards/edit-deactivate.guard';
import { ContentAddItemModule } from '@routes/content-add-item/content-add-item.module';

const routes: Routes = [
  {
    path: '',
    component: ContentItemComponent,
  },
  {
    path: 'add-item',
    component: ContentAddItemComponent,
    resolve: {
      validValues: ItemValidValuesResolver,
      categories: CategoriesResolver,
    },
    canDeactivate: [EditDeactivateGuard],
    data: {
      breadcrumb: 'navigation.add_item',
    }
  },
  {
    path: 'edit-item/:id',
    component: ContentAddItemComponent,
    canDeactivate: [EditDeactivateGuard],
    data: {
      breadcrumb: 'navigation.edit_item',
    }
  },
];

@NgModule({
  declarations: [ContentItemComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    TranslateModule,
    NgxPaginationModule,
    DirectiveModule,
    TableFooterModule,
    NgSelectModule,
    ContentAddItemModule,
  ],
  exports: [ContentItemComponent, RouterModule]
})
export class ContentItemModule { }

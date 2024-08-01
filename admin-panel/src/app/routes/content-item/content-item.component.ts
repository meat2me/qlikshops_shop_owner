import { CategoryService } from '@services/category.service';
import { fieldRemover } from '@utils/sanitizer';
import { LocalSearcher } from '@utils/local-searcher';
import { ItemService } from '@services/item.service';
import { OwnerItem } from '@models/owner-item.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { BaseComponent } from '@components/base/base.component';

import { takeUntil, mergeMap, debounceTime, tap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '@services/store.service';
import { Categories } from '@models/category.model';
@Component({
  selector: 'app-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.scss']
})
export class ContentItemComponent extends BaseComponent implements OnInit {

  public listCategories: Categories[] = [];


  tempImage = 'assets/images/item-image.png';
  excelParam = '';
  data: OwnerItem[] = [];
  searcher = new LocalSearcher<OwnerItem>();
  searchTerm = '';

  tableOptions: PaginationInstance = {
    id: 'table',
    currentPage: 0,
    itemsPerPage: 10,
  };

  toggleItemSubj = new Subject<OwnerItem>();

  isAdmin = this.authServ.isAdmin();
  storeId;
  categoryFilter;
  listItem;
  source$: Observable<Event>;

  private sanitizer = fieldRemover([
    'name',
    'category_name',
    'image'
  ]);


  @ViewChild('file') fileInput: ElementRef;


  constructor(
    private itemServ: ItemService,
    private authServ: AuthService,
    private route: ActivatedRoute,
    private storeService: StoreService,
    private categoriesServ: CategoryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const location = params.get('location');
      if (location === 'shop-page') {
        this.storeService.getSidebarChange(true);
        this.isAdmin = false;
        this.storeId = localStorage.getItem('STORE_ID').toString();
      }
    });
    this._getAllCategories();
    this.route.queryParams.subscribe(query => {
      this.categoryFilter = query.category;
    });
    super.ngOnInit();
    this.fetchData();
    this.addToggleEvent();
    window.addEventListener('storage', this.message_receive.bind(this));
  }

  fetchData() {
    // this.route.data
    if (this.isAdmin) {
      this.itemServ.getAdminItems()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res) => {
          this.data = res.items;
          this.searcher.init(this.data, { fields: ['name', 'categories'] });
        });
    } else {
      this.itemServ.getOwnerItems(this.storeId)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res) => {
          console.log(res.items.filter(item => item.category_name === 'קפואים').map(item => item.name));
          console.log(res.items);
          this.data = res.items;
          if (this.categoryFilter) {
            // this.listItem = this.data.filter((d: any) => d.category_name === this.categoryFilter);
            this.listItem = this.data.filter((d: any) => d.category_name === 'קפואים ');
            this.searcher.init(this.listItem, { fields: ['name', 'categories'] });
          } else {
            this.searcher.init(this.data, { fields: ['name', 'categories'] });
          }
        });
    }
  }

  addToggleEvent() {
    if (this.isAdmin) {
      this.toggleItemSubj
        .pipe(
          takeUntil(this.destroyed$),
          tap(i => { i.is_in_stock = !i.is_in_stock; }),
          debounceTime(690),
          mergeMap((i: OwnerItem) => this.itemServ.setAdminItemInStock(this.sanitizer(i))))
        .subscribe();
    } else {
      this.toggleItemSubj
        .pipe(
          takeUntil(this.destroyed$),
          tap(i => { i.is_in_stock = !i.is_in_stock; }),
          debounceTime(690),
          mergeMap((i: OwnerItem) => this.itemServ.setOwnerItemInStock(this.sanitizer(i), this.storeId)))
        .subscribe();
    }
  }

  search() {
    this.searcher.search(this.searchTerm);
  }

  message_receive() {
    if (this.isAdmin) {
      this.itemServ.getAdminItems()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res) => {
          this.data = res.items;
          localStorage.removeItem('itemId');
          localStorage.removeItem('deleteItem');
        });
    }

  }

  reset() {
    if (this.searchTerm === '' && this.categoryFilter) {
      this.searcher.init(this.data, { fields: ['name', 'categories'] });
    } else {
      this.searchTerm = '';
      this.searcher.reset();
    }
  }

  private _getAllCategories(): void {
    if (this.isAdmin) {
      this.categoriesServ.getAdminCategories()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res: any) => {
          if (!res?.categories) {
            return;
          }
          this.listCategories = res.categories;
        });
    }
    else {
      this.categoriesServ.getCategories(this.storeId)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res: any) => {
          if (!res?.categories) {
            return;
          }
          this.listCategories = res.categories;
        });
    }
  }

  public onCategoriesChange(event: any): void {
    if (!event?.name) {
      this.searcher.reset();
    }
    const { name } = event;
    this.searcher.search(name);

  }
}

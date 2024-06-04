import { AlertService } from '@services/alert.service';
import { Category } from '@models/category.model';
import { CategoryService } from '@services/category.service';
import { takeUntil, debounceTime, concatMap, catchError } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { AddCategoryModalComponent } from '@modals/add-category/add-category.component';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fieldRemover } from '@utils/sanitizer';
import { AuthService } from '@services/auth.service';
import { StoreService } from '@services/store.service';

enum Move {
  Up = 1,
  Down = 2,
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryComponent extends BaseComponent implements OnInit {
  constructor(
    private modalServ: NgbModal,
    private alertServ: AlertService,
    private route: ActivatedRoute,
    private storeService: StoreService,
    private catServ: CategoryService,
    private authServ: AuthService
  ) {
    super();
    this.configEvents();
  }
  moveSub = new Subject();
  direction = Move;
  selectedItem: Category = null;
  // tslint:disable-next-line: variable-name
  _categories: Category[] = [];
  categoriesMap = new Map<number, Category>();

  moveUpSubj = new Subject<Category>();
  moveDownSubj = new Subject<Category>();
  moveUp$: Observable<Category>;
  moveDown$: Observable<Category>;
  isAdmin = this.authServ.isAdmin();
  storeId;

  get categories() {
    return this._categories;
  }

  set categories(value: Category[]) {
    this._categories = value;
    this.processCategories();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroyed$)).subscribe((params) => {
      const location = params.get('location');
      if (location == 'shop-page') {
        this.storeService.getSidebarChange(true);
        this.isAdmin = false;
        this.storeId = localStorage.getItem('STORE_ID').toString();
      }
    });
    if (this.isAdmin) {
      this.catServ
        .getAdminCategories()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res) => {
          this.categories = res.categories;
        });
    } else {
      this.catServ
        .getCategories(this.storeId)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res) => {
          this.categories = res.categories;
        });
    }
  }

  public createNewCategory() {
    const modal = this.modalServ.open(AddCategoryModalComponent, {
      centered: true,
    });
    const modalComp = modal.componentInstance as AddCategoryModalComponent;
    modalComp.categories = this._categories;
    modal.result.then(this.addNewItem.bind(this));
  }

  private addNewItem(cat: Category) {
    this.categories.push(cat);
    cat.siblings = this.categories;
    cat.children = cat.children || [];
  }

  public editCategory() {
    const modal = this.modalServ.open(AddCategoryModalComponent, {
      centered: true,
    });
    const addModal = modal.componentInstance as AddCategoryModalComponent;
    addModal.categories = this.categories;
    addModal.data = this.selectedItem;
    modal.result.then(this.editItem.bind(this));
  }

  private editItem(editedCat: Category) {
    let item = this.selectedItem;
    item = Object.assign(this.selectedItem, editedCat);
    this.selectedItem = Object.assign(item, editedCat);
  }

  public removeCategory() {
    this.showConfirmDelete().then(() =>
      this.catServ.deleteCategory(this.selectedItem.category_id).subscribe({
        next: this.removeSelectedItem.bind(this),
        error: console.error,
      })
    );
  }
  private showConfirmDelete() {
    return this.alertServ.showConfirm(
      'modal.delete_category_title',
      'modal.delete_category_content'
    );
  }

  private removeItem(i: Category) {
    this.removeFromParent(i);
    this.categoriesMap.delete(i.category_id);
  }

  // relocateItem is to remove item from parent without losing its map reference
  private removeFromParent(cat: Category) {
    const pos = cat.siblings.indexOf(cat);
    if (pos < 0) {
      return;
    }

    cat.siblings.splice(pos, 1);
  }

  private removeSelectedItem() {
    const i = this.selectedItem;
    this.selectedItem = null;
    this.removeItem(i);
  }

  public selectItem(item: Category) {
    this.selectedItem = item;
  }

  public moveUp(cat: Category) {
    this.move(cat, cat.siblings, -1);
    cat.direction = Move.Up;
    const reqItem = sanitizeItem(cat);
    return this.catServ.moveCategory(reqItem);
  }

  public moveDown(cat: Category) {
    this.move(cat, cat.siblings, 1);
    cat.direction = Move.Down;
    const reqItem = sanitizeItem(cat);
    return this.catServ.moveCategory(reqItem);
  }

  private processCategories() {
    const root: Category = {
      category_id: 0,
      image: null,
      name: 'Root',
      children: this._categories,
    };
    this.categoriesMap.set(0, root);

    const addSiblings =
      (parent: Category) => (cat: Category, _, o: Category[]) => {
        cat.siblings = o;
        this.categoriesMap.set(cat.category_id, cat);
        if (!cat.children) {
          return;
        }
        cat.children.forEach(addSiblings(cat));
      };
    this._categories.forEach(addSiblings(root));
  }

  private configEvents() {
    const delay = 300;
    this.moveDownSubj
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(delay),
        concatMap((a) => this.moveDown(a)),
        catchError((_, o) => o)
      )
      .subscribe();
    this.moveUpSubj
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(delay),
        concatMap((a) => this.moveUp(a)),
        catchError((_, o) => o)
      )
      .subscribe();
  }

  private move(ele: any, arr: any[], delta: number) {
    const index = arr.indexOf(ele);
    const newIndex = index + delta;
    if (newIndex < 0 || newIndex === arr.length) {
      return;
    } // Already at the top or bottom.
    const indexes = [index, newIndex].sort(); // Sort the indexes
    arr.splice(indexes[0], 2, arr[indexes[1]], arr[indexes[0]]); // Replace from lowest index, two elements, reverting the order
  }
}

const sanitizeItem = fieldRemover([
  'name',
  'parent_category_id',
  'isOpen',
  'children',
  'children',
  'siblings',
  'image',
]);

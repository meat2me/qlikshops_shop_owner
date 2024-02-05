import { AlertService } from '@services/alert.service';
import { IImage, IUpdateItemReq } from '@services/item.service';
import { OwnerItemDetail } from '@models/owner-item-detail.model';
import { Category } from '@models/category.model';
import { ItemService } from '@services/item.service';
import { ItemConvertedValidValues } from '@models/item-valid.value.model';
import { takeUntil, map } from 'rxjs/operators';
import { ActivatedRoute, Router, CanDeactivate } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base/base.component';
import { ErrorResp } from '@models/resp.model';
import { combineLatest, of } from 'rxjs';
import { CategoryService } from '@services/category.service';
import { fieldRemover } from '@utils/sanitizer';
import { BreadcrumbService } from '@services/breadcrumb.service';
import { AuthService } from '@services/auth.service';
import { LanguageService } from '@services/language.service';

@Component({
  selector: 'app-content-add-item',
  templateUrl: './content-add-item.component.html',
  styleUrls: ['./content-add-item.component.scss'],
})
export class ContentAddItemComponent
  extends BaseComponent
  implements OnInit, CanDeactivate<ContentAddItemComponent>
{
  form: FormGroup;
  validValues: ItemConvertedValidValues;
  categories: Category[];
  data: OwnerItemDetail;
  originData: OwnerItemDetail;
  listOptions = [];
  isAdmin = this.authServ.isAdmin();
  storeId;
  itemId;

  public listStores = [];

  get isEdit() {
    return !!this.data;
  }
  get nameCtrl() {
    return this.form.controls.name;
  }

  get brandCtrl() {
    return this.form.controls.brand;
  }

  get unitCtrl() {
    return this.form.controls.unit;
  }

  get descriptionCtrl() {
    return this.form.controls.description;
  }

  get priceCtrl() {
    return this.form.controls.price;
  }

  get salePriceCtrl() {
    return this.form.controls.sale_price;
  }
  get salePriceCheckCtrl() {
    return this.form.controls.sale_price_check;
  }

  get inStockCtrl() {
    return this.form.controls.is_in_stock;
  }

  get categoryArrCtrl() {
    return this.form.controls.categories as FormArray;
  }

  get imagesArrCtrl() {
    return this.form.controls.image;
  }

  get optionsArrCtrl() {
    return this.form.controls.list_options as FormArray;
  }

  get formValue() {
    return this.sanitizer(this.form.value);
  }

  private sanitizer = fieldRemover(['sale_price_check', 'list_options']);

  private sanitizerOwner = fieldRemover([
    'name',
    'unit',
    'description',
    'categories',
    'image_name',
  ]);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertServ: AlertService,
    private itemServ: ItemService,
    private catServ: CategoryService,
    private breadcrumbServ: BreadcrumbService,
    private authServ: AuthService,
    private langServ: LanguageService
  ) {
    super();
  }

  canDeactivate() {
    return this.form.pristine;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const location = params.get('location');
      if (location == 'shop-page') {
        this.isAdmin = false;
        this.storeId = localStorage.getItem('STORE_ID').toString();
      }
    });
    this.buildForm();
    this.loadData();
    this.form.valueChanges.subscribe(() => {});
  }

  loadData() {
    this.itemId = this.route.snapshot.params.id;
    this.isAdmin
      ? combineLatest([
          this.catServ.getAdminCategories().pipe(map((res) => res.categories)),
          this.itemId
            ? this.itemServ.getAdminItem(this.itemId)
            : of<OwnerItemDetail>(null),
          this.itemId
            ? of<ItemConvertedValidValues>(null)
            : this.itemServ.getItemValidValues(),
        ])
          .pipe(takeUntil(this.destroyed$))
          .subscribe(([categories, item, validValues]) => {
            this.validValues =
              validValues || (item.valid_values as ItemConvertedValidValues);
            this.categories = categories;
            this.data = item;
            if (item?.stores) {
              this._initStoreAssign(item.stores);
            }
            if (validValues?.stores) {
              this._initStoreAssign(validValues.stores);
            }
            for (const key in this.validValues.options) {
              if (this.validValues.options.hasOwnProperty(key)) {
                this.listOptions.push({
                  id: key,
                  name: this.validValues.options[key],
                });
              }
            }
            this.listOptions.forEach((el) => {
              this.optionsArrCtrl.push(this.createItemOptsForm(el.id, el.name));
            });
            this.data && (this.data.item_id = this.itemId);
            this.isEdit && this.buildEdit();
          })
      : combineLatest([
          this.catServ
            .getCategories(this.storeId)
            .pipe(map((res) => res.categories)),
          this.itemId
            ? this.itemServ.getOwnerItem(this.itemId, this.storeId)
            : of<OwnerItemDetail>(null),
          this.itemId
            ? of<ItemConvertedValidValues>(null)
            : this.itemServ.getItemValidValues(),
        ])
          .pipe(takeUntil(this.destroyed$))
          .subscribe(([categories, item, validValues]) => {
            this.validValues =
              validValues || (item.valid_values as ItemConvertedValidValues);
            this.categories = categories;
            this.data = item;
            for (const key in this.validValues.options) {
              if (this.validValues.options.hasOwnProperty(key)) {
                this.listOptions.push({
                  id: key,
                  name: this.validValues.options[key],
                });
              }
            }
            this.listOptions.forEach((el) => {
              this.optionsArrCtrl.push(this.createItemOptsForm(el.id, el.name));
            });
            this.data && (this.data.item_id = this.itemId);
            this.isEdit && this.buildEdit();
          });
  }

  buildForm() {
    this.form = this.fb.group({
      name: [null],
      brand: [null],
      unit: [null],
      description: [null],
      price: [null],
      sale_price: [{ value: null, disabled: true }],
      sale_price_check: [false],
      is_in_stock: [true],
      categories: this.fb.array(
        [this.createCategory()],
        [Validators.minLength(1)]
      ),
      image: [''],
      image_name: [''],
      options: [''],
      stores: this.fb.array([]),
      list_options: this.fb.array([]),
      fixed_weight_gram: [''],
    });
    this.settingSwitchers();
  }

  buildEdit() {
    this.updateBreadcrumb();
    this.patchValues();
  }

  private updateBreadcrumb() {
    const { name: label, item_id } = this.data;
    this.breadcrumbServ.pushBreadcrumb({
      label,
      url: `/content/items/edit-item/${item_id}`,
    });
  }

  patchValues() {
    this.patchOptions();
    this.patchCategories();
    this.form.patchValue({ image: this.data.images[0]?.image });
    this.form.markAsPristine();
    this.form.patchValue(this.data);
  }

  patchCategories() {
    const catArrCtrl = this.categoryArrCtrl;
    catArrCtrl.clear();
    this.data.categories.forEach((c, i) => {
      catArrCtrl.setControl(i, this.createCategory(c.category_id));
    });
  }

  patchOptions() {
    const listOp = this.data.options.split(',');
    const optArrCtrl = this.optionsArrCtrl;
    optArrCtrl.clear();
    this.listOptions.forEach((o, i) => {
      // const id = parseInt(o.id);
      if (listOp.includes(o.id)) {
        this.optionsArrCtrl.setControl(
          i,
          this.createItemOptsForm(o.id, o.name, true)
        );
      } else {
        this.optionsArrCtrl.setControl(
          i,
          this.createItemOptsForm(o.id, o.name)
        );
      }
    });
  }

  createCategory(value = null) {
    return this.fb.group({
      category_id: [value, [Validators.required]],
    });
  }

  createItemOptsForm(id = null, name = null, option_check = false) {
    return this.fb.group({
      id: [id],
      name: [name],
      option_check: [option_check],
    });
  }

  get formattedItemOpts() {
    return this.optionsArrCtrl.value
      .filter((x) => x.option_check == true)
      .map((x) => x.id)
      .join(',');
  }

  pushCategory() {
    this.categoryArrCtrl.push(this.createCategory());
  }

  deleteCategory(i: number) {
    this.categoryArrCtrl.removeAt(i);
  }

  onSubmit() {
    this.form.controls.options.setValue(this.formattedItemOpts);
    this.form.controls.stores.setValue(this.storeControls.value);
    this.itemServ.addItem(this.formValue).subscribe({
      next: this.onSubmitSuccess.bind(this),
      error: this.onError.bind(this),
    });
  }

  private onSubmitSuccess() {
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.moveBackToItemList();
  }

  async onEditSubmit() {
    const a = await this.alertServ.showConfirmChanges();
    if (!a) {
      return;
    }
    const req = this.formValue;
    req.item_id = this.data.item_id;
    req.options = this.formattedItemOpts;
    const modImages = this.getModifiedImages();
    if (modImages !== null) {
      req.image = modImages.new_images;
    } else {
      delete req.image;
    }
    this.isAdmin
      ? this.itemServ.updateItem(req).subscribe({
          next: this.onEditSuccess.bind(this),
          error: this.onError.bind(this),
        })
      : this.itemServ
          .setStoreItem(this.sanitizerOwner(req), this.storeId)
          .subscribe({
            next: this.onEditSuccess.bind(this),
            error: this.onError.bind(this),
          });
  }

  onEditSuccess() {
    this.alertServ.showChangedSuccess();
    this.form.markAsPristine();
    if (this.isAdmin) {
      localStorage.itemId = this.itemId;
    }
  }

  async onDeleteItem() {
    const a = await this.alertServ.showConfirm(
      'modal.delete_item_title',
      'modal.delete_item_content',
      false
    );
    if (!a) {
      return;
    }
    this.itemServ.deleteItem(this.itemId).subscribe({
      next: this.onDeleteItemSuccess.bind(this),
      error: this.onError.bind(this),
    });
  }

  onDeleteItemSuccess() {
    this.alertServ.showDeleteSuccess().then(() => {
      localStorage.deleteItem = 1;
      window.close();
    });
  }

  private onError(err: ErrorResp) {
    this.alertServ.showAlert(err.message, err.param || err.message);
  }

  private getModifiedImages(): { new_images: IImage } {
    if (this.imagesArrCtrl.pristine) {
      return null;
    }

    const imageCtrl = this.imagesArrCtrl;

    let new_images: IImage = null;

    if (imageCtrl.dirty) {
      new_images = this.imagesArrCtrl.value;
    }
    return { new_images };
  }

  onEditCancel() {
    this.moveBackToItemList();
  }

  get preprocessedData() {
    return this.form.getRawValue();
  }

  private moveBackToItemList() {
    this.router.navigate(['/content', 'items', 'admin-page']);
  }

  private settingSwitchers() {
    this.settingSalePriceCtrl();
  }

  private settingSalePriceCtrl() {
    this.settingSwitchCtrl(this.salePriceCheckCtrl, this.salePriceCtrl);
  }

  private settingSwitchCtrl(sw: AbstractControl, ctrl: AbstractControl) {
    sw.valueChanges.subscribe((enabled) => {
      if (enabled) {
        ctrl.enable({ emitEvent: false });
      } else {
        ctrl.disable({ emitEvent: false });
        ctrl.setValue(null, { emitEvent: false });
      }
    });

    ctrl.valueChanges.subscribe((value) => {
      if (value !== null) {
        sw.setValue(true, { checked: true });
      }
    });
  }

  get isRTL() {
    return this.langServ.isRtl;
  }

  // *checkbox store sections

  get storeControls() {
    return this.form.get('stores') as FormArray;
  }

  private _createStoreCheckboxForm() {
    return new FormGroup({
      is_available: new FormControl(0),
      name: new FormControl(null),
      store_code: new FormControl(null),
      store_id: new FormControl(null),
    });
  }

  private _getStoreControls(index: number) {
    return this.storeControls.at(index) as FormGroup;
  }

  private _initStoreAssign(stores: any): void {
    this.listStores = stores;
    this.listStores.forEach((el: any) => {
      this.storeControls.push(this._createStoreCheckboxForm());
    });
    this.form.patchValue({
      stores: this.listStores,
    });
  }
}

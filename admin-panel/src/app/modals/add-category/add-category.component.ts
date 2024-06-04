import { deepClone } from '@utils/deep-clone';
import { Category } from '@models/category.model';
import { ErrorResp } from '@models/resp.model';
import { CategoryService } from '@services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { AlertService } from '@services/alert.service';
import { ImageInputComponent } from '@components/image-input/image-input.component';
import { LanguageService } from '@services/language.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddCategoryModalComponent implements OnInit {
  private _data: Category;
  private _categories: Category[] = [];
  form: FormGroup;
  @Input() useRoot = true;
  @Input() set data(value: Category) {
    this._data = value;
    this.form.patchValue(this._data);
  }
  get data() { return this._data; }

  @Input() set categories(value: Category[]) {
    if (this.useRoot) {
      const root: Category = {
        category_id: 0,
        name: 'Root',
        children: value,
        image: null,
      };
      const sibs = [root];
      root.siblings = sibs;
      this._categories = sibs;
    } else {
      this._categories = value;
    }
  }

  get categories() {
    return this._categories;
  }

  @ViewChild('imageInput') imageInput: ImageInputComponent;


  get isEdit() { return !!this._data; }

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private alertServ: AlertService,
    private catServ: CategoryService,
    private langServ: LanguageService,
  ) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      image: [''],
      image_name: ['', []],
      has_note: [null],
    });
  }

  ngOnInit(): void { }

  onCreateSubmit() {
    this.catServ.addCategories(this.form.value)
      .subscribe({
        next: this.handleCreateSuccess.bind(this),
        error: this.handleError.bind(this),
      });
  }

  onEditSubmit() {
    if (this.form.invalid) { return; }
    const data = deepClone(this.form.value);
    if (this.form.controls.image.pristine) {
      delete data.image;
      delete data.image_name;
    }
    this.catServ.updateCategory({ ...data, category_id: this.data.category_id })
      .subscribe({
        next: this.handleEditSuccess.bind(this),
        error: this.handleError.bind(this),
      });
  }

  private handleCreateSuccess(res: any) {
    const { category_id } = res;
    const value: Category = this.form.value;
    value.category_id = category_id;
    value.image = this.imageInput.tempImg;
    this.activeModal.close(value);
  }

  private handleEditSuccess(res: any) {
    const value: Category = this.form.value;
    if (this.form.controls.image.dirty) {
      value.image = this.imageInput.tempImg;
    }
    this.activeModal.close(value);
  }

  handleError(err: ErrorResp) {
    this.alertServ.showAlert(err.message, err.param);
  }

  get isRTL() {
    return this.langServ.isRtl;
  }
}

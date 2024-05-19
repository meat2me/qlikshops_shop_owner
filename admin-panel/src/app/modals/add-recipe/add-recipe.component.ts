import { deepClone } from '@utils/deep-clone';
import { ErrorResp } from '@models/resp.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { AlertService } from '@services/alert.service';
import { ImageInputComponent } from '@components/image-input/image-input.component';
import { LanguageService } from '@services/language.service';
import { RecipesService } from '@services/recipes.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddRecipeComponent implements OnInit {
  private _data;
  form: FormGroup;

  @Input() useRoot = true;
  @Input() set data(value) {
    this.recipeServ.getRecipes(value.recipe_id).subscribe((res: any) => {
      this._data = res;
      this.form.patchValue(this._data);
    });
  }
  get data() {
    return this._data;
  }

  @ViewChild('imageInput') imageInput: ImageInputComponent;

  get isEdit() {
    return !!this._data;
  }

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private alertServ: AlertService,
    private recipeServ: RecipesService,
    private langServ: LanguageService
  ) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      text: [null, Validators.required],
      image: [''],
      image_name: ['', []],
    });
  }

  ngOnInit(): void {}

  onCreateSubmit() {
    this.recipeServ.addRecipes(this.form.value).subscribe({
      next: this.handleCreateSuccess.bind(this),
      error: this.handleError.bind(this),
    });
  }

  onEditSubmit() {
    if (this.form.invalid) {
      return;
    }
    const data = deepClone(this.form.value);
    if (this.form.controls.image.pristine) {
      delete data.image;
      delete data.image_name;
    }
    this.recipeServ
      .updateRecipes({ ...data, recipe_id: this.data.recipe_id })
      .subscribe({
        next: this.handleEditSuccess.bind(this),
        error: this.handleError.bind(this),
      });
  }

  private handleCreateSuccess(res: any) {
    const { recipe_id } = res;
    const value = this.form.value;
    value.recipe_id = recipe_id;
    value.image = this.imageInput.tempImg;
    this.activeModal.close(value);
  }

  private handleEditSuccess(res: any) {
    const value = this.form.value;
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

import { takeUntil } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { AlertService } from '@services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '@services/store.service';
import { RecipesService } from '@services/recipes.service';
import { BaseComponent } from '@components/base/base.component';
import { AddRecipeComponent } from '@modals/add-recipe/add-recipe.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent extends BaseComponent implements OnInit {
  constructor(
    private modalServ: NgbModal,
    private alertServ: AlertService,
    private route: ActivatedRoute,
    private storeService: StoreService,
    private recipesServ: RecipesService,
    private authServ: AuthService
  ) {
    super();
  }
  selectedItem;
  isAdmin = this.authServ.isAdmin();
  storeId;
  recipes;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const location = params.get('location');
      if (location == 'shop-page') {
        this.storeService.getSidebarChange(true);
        this.isAdmin = false;
        this.storeId = localStorage.getItem('STORE_ID').toString();
      }
    });
    if (this.isAdmin) {
      this.recipesServ
        .getAdminRecipes()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res) => {
          this.recipes = res.recipes;
        });
    }
  }

  public createNewRecipe() {
    const modal = this.modalServ.open(AddRecipeComponent, {
      centered: true,
    });
    modal.componentInstance as AddRecipeComponent;
    modal.result.then(this.addNewItem.bind(this));
  }

  private addNewItem(recipe) {
    this.recipes.push(recipe);
  }

  public editCategory() {
    const modal = this.modalServ.open(AddRecipeComponent, {
      centered: true,
    });
    const addModal = modal.componentInstance as AddRecipeComponent;
    addModal.data = this.selectedItem;
    modal.result.then(this.editItem.bind(this));
  }

  private editItem(editedCat) {
    let item = this.selectedItem;
    item = Object.assign(this.selectedItem, editedCat);
    this.selectedItem = Object.assign(item, editedCat);
  }

  public removeCategory() {
    this.showConfirmDelete().then(() =>
      this.recipesServ.deleteRecipes(this.selectedItem.recipe_id).subscribe({
        next: this.removeSelectedItem.bind(this),
        error: console.error,
      })
    );
  }
  private showConfirmDelete() {
    return this.alertServ.showConfirm(
      'modal.delete_recipe_title',
      'modal.delete_recipe_content'
    );
  }

  private removeItem(i) {
    const pos = this.recipes.indexOf(i);
    if (pos < 0) {
      return;
    }
    this.recipes.splice(pos, 1);
  }

  private removeSelectedItem() {
    const i = this.selectedItem;
    this.selectedItem = null;
    this.removeItem(i);
  }

  public selectItem(item) {
    this.selectedItem = item;
  }
}

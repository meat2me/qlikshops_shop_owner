import { AuthService } from '@services/auth.service';
import { Category } from '@models/category.model';
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { LanguageService } from '@services/language.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-accordion',
  templateUrl: './category-accordion.component.html',
  styleUrls: ['./category-accordion.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryAccordionComponent implements OnInit {
  // customized style
  public paddingLeft = 0;

  @Input() level = 0;

  @Input() paddingStep = 40;

  @Input() cat;

  @Input() selected: Category;

  @Input() isRecipe: boolean;

  public location;

  isAdmin = this.authServ.isAdmin();

  // @Output() onSelect = new EventEmitter<ICategory>();
  @Input() selectEmitter: EventEmitter<Category>;
  constructor(private langServ: LanguageService, private route: ActivatedRoute, private authServ: AuthService) {
  }

  ngOnInit(): void {
    this.paddingLeft = this.paddingStep * this.level;
    this.route.paramMap.subscribe((params) => {
      this.location = params.get('location');
      if (this.location === 'shop-page') {
        this.isAdmin = false;
      }
    });
  }

  get isRTL() {
    return this.langServ.isRtl;
  }

}

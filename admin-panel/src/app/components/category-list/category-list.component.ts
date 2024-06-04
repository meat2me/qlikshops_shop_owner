import { Category } from '@models/category.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  @Input() data: Category[];

  @Input() selectedItem: Category;
  @Output() selectedItemChange = new EventEmitter<Category>();
  @Input() isRecipe: boolean;

  constructor() { }

  ngOnInit(): void {
  }
}

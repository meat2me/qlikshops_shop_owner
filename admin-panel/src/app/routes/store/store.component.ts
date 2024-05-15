import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@models/store.model';
import { StoreService } from '@services/store.service';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  tableOptions: PaginationInstance;
  stores: Store[] = [];
  currentSortOrder: string;
  searchStore = this.stores;
  constructor(private storeService: StoreService, private router: Router) {
    this.tableOptions = {
      id: 'table',
      currentPage: 0,
      itemsPerPage: 15,
    };
  }

  terms: string;
  ngOnInit(): void {
    this.storeService.getAllStore().subscribe((res: any) => {
      this.stores = res.stores;
      this.searchStore = this.stores;
    });
  }
   // Assuming searchStore is an array of objects

  // Method to sort the searchStore array by a specific property
  sortTable(property: string) {
    if (this.currentSortOrder === property) {
      this.searchStore.reverse(); // Reverse the array to switch sorting order
    } else {
      this.searchStore.sort((a, b) => (a[property] > b[property]) ? 1 : ((b[property] > a[property]) ? -1 : 0));
    }
    this.currentSortOrder = property; // Update the current sorting order
  }
  isAscendingSort(property: string): boolean {
    return this.currentSortOrder === property && this.searchStore.length > 1 && this.searchStore[0][property] < this.searchStore[1][property];
  }

  // Inside your component class
  hoveredColumn: string = '';

  setHoveredColumn(column: string) {
    this.hoveredColumn = column;
  }

  resetHoveredColumn() {
    this.hoveredColumn = '';
  }
  public searchStores(): void {
    if (this.terms != null) {
      this.terms = this.terms.trim().toLowerCase();
      const isMatch = (store: Store) => {
        const isFound =
          store.name.toLowerCase().includes(this.terms) ||
          store.address.toLowerCase().includes(this.terms);
        return isFound;
      };
      this.searchStore = this.stores.filter(isMatch);
      this.tableOptions.currentPage = 1;
    }
    this.terms === '' ? (this.searchStore = this.stores) : '';
  }

  openOwnerStore(store_id) {
    localStorage.setItem('STORE_ID', store_id);
    localStorage.removeItem('MENU');
    this.router.navigate(['/home/shop-page']);
  }

  clearSearch() {
    this.terms = null;
    this.searchStore = this.stores;
  }
}

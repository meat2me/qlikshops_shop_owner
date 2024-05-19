import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { OpenOrder } from '@models/open-orders.model';
import { OrderService } from '@services/order.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '@services/store.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  constructor(
    private orderService: OrderService,
  ) {
    this.tableOptions = {
      id: 'table',
      currentPage: 0,
      itemsPerPage: 10,
    };
  }

  get fromDate() {
    if (this.historyForm.value.fromDate != null) {
      return `${this.historyForm.value.fromDate.year}-${this.historyForm.value.fromDate.month}-${this.historyForm.value.fromDate.day}`;
    } else {
      return null;
    }
  }

  get toDate() {
    if (this.historyForm.value.fromDate != null) {
      return `${this.historyForm.value.toDate.year}-${this.historyForm.value.toDate.month}-${this.historyForm.value.toDate.day}`;
    } else {
      return null;
    }
  }

  get keyWord() {
    return this.historyForm.value.keyWord;
  }

  get remainEntries() {
    return this.openOrders.length % this.tableOptions.itemsPerPage;
  }
  tableOptions: PaginationInstance;
  openOrders: OpenOrder[] = [];
  originData: OpenOrder[] = [];

  startDate = {};
  currentDate;

  historyForm = new FormGroup({
    fromDate: new FormControl(this.startDate),
    toDate: new FormControl(null),
    keyWord: new FormControl(null),
  });

  async iniDate() {
    const currentDate = await moment().valueOf();
    const onWeekBefore = currentDate - 604800000;

    this.startDate = {
      year: moment(onWeekBefore).get('year'),
      month: 1 + moment(onWeekBefore).get('month'),
      day: moment(onWeekBefore).get('date'),
    };
    this.currentDate = {
      year: moment(currentDate).get('year'),
      month: 1 + moment(currentDate).get('month'),
      day: moment(currentDate).get('date'),
    };

    this.historyForm.patchValue({
      fromDate: this.startDate,
      toDate: this.currentDate,
    });
  }

  ngOnInit(): void {
    this.orderService.getHistoryByRange().subscribe((res: any) => {
      this.openOrders = res.orders;
      this.originData = res.orders;
    });
    this.iniDate();
  }

  openDetail(id) {
    const url = `/order/history/shop-page/detail/${id}`;
    window.open(url, '_blank');
  }

  searchingByDate() {
    this.orderService
      .getHistoryByRange(this.fromDate, this.toDate, this.keyWord)
      .subscribe((res: any) => {
        this.openOrders = res.orders;
      });
  }

  clearForm() {
    this.historyForm.reset();
    this.openOrders = this.originData;
  }
}

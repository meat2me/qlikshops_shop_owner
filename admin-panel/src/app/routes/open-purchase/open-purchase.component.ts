import { Component, OnInit } from '@angular/core';
import { OpenOrder } from '@models/open-orders.model';
import { OrderService } from '@services/order.service';
import { DateTimePipe } from 'app/pipes/date-time.pipe';
import * as moment from 'moment';
import { PaginationInstance } from 'ngx-pagination';
@Component({
  selector: 'app-open-purchase',
  templateUrl: './open-purchase.component.html',
  styleUrls: ['./open-purchase.component.scss'],
  providers: [DateTimePipe],
})
export class OpenPurchaseComponent implements OnInit {
  tableOptions: PaginationInstance;
  openOrders: OpenOrder[] = [];
  searchOrder = this.openOrders;
  deliveryTime: any = '';
  constructor(private orderService: OrderService) {
    this.tableOptions = {
      id: 'table',
      currentPage: 0,
      itemsPerPage: 10,
    };
  }

  terms: string;

  ngOnInit(): void {
    this.orderService.getOpenOrders().subscribe((res) => {
      this.openOrders = res.orders;
      this.searchOrder = this.openOrders;
    });
  }

  pageChanged(event: any) {
    this.tableOptions.currentPage = event;
  }

  get remainEntries() {
    return this.openOrders.length % this.tableOptions.itemsPerPage;
  }

  openDetail(id) {
    const url = `/order/open-orders/shop-page/detail/${id}`;
    window.open(url, '_blank');
  }

  public searchOrders(): void {
    if (this.terms != null) {
      this.terms = this.terms.trim();
      const isMatch = (order: OpenOrder) => {
        const isFound =
          order.client_name.toLowerCase().includes(this.terms) ||
          order.phone_num.toLowerCase().includes(this.terms);
        return isFound;
      };
      this.searchOrder = this.openOrders.filter(isMatch);
      this.tableOptions.currentPage = 1;
    }
    this.terms == '' ? (this.searchOrder = this.openOrders) : '';
  }
  public filterOrders(): void {
    if (this.deliveryTime) {
      let dt = moment(this.deliveryTime, 'DD/MM/YYYY');
      if (typeof this.deliveryTime !== 'string') {
        const { year, month, day } = this.deliveryTime;
        dt = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
      }

      const isMatch = (order: OpenOrder) => {
        const utcDate = moment(order.delivery_time).utc(true);
        const localDate = moment(utcDate).local();
        const isFound = localDate
          .format('YYYY-MM-DD')
          ?.includes(dt.format('YYYY-MM-DD'));

        return isFound;
      };
      this.searchOrder = this.openOrders.filter(isMatch);
      this.tableOptions.currentPage = 1;
    } else {
      this.searchOrder = this.openOrders;
    }
  }

  clearSearch() {
    this.terms = null;
    this.searchOrder = this.openOrders;
  }
}

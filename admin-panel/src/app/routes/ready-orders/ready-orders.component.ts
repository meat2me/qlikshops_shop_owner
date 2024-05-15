import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { OrderService } from '@services/order.service';
import { OpenOrder } from '@models/open-orders.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifyModalComponent } from '@modals/notify-modal/notify-modal.component';
import { Resp } from '@models/resp.model';
import { ReadyOrderFilter } from '@models/order-item.model';

@Component({
  selector: 'app-ready-orders',
  templateUrl: './ready-orders.component.html',
  styleUrls: ['./ready-orders.component.scss'],
})
export class ReadyOrdersComponent implements OnInit {
  tableOptions: PaginationInstance;
  readyOrders: OpenOrder[] = [];
  searchOrder = this.readyOrders;
  constructor(
    private orderService: OrderService,
    private modalService: NgbModal,
  ) {
    this.tableOptions = {
      id: 'table',
      currentPage: 0,
      itemsPerPage: 10,
    };
  }

  terms: string;

  ngOnInit(): void {
    this.orderService.getReadyOrders(ReadyOrderFilter.READY_ORDER_PICKUP).subscribe((res) => {
      this.readyOrders = res.orders;
      this.searchOrder = this.readyOrders;
    });
  }

  pageChanged(event: any) {
    this.tableOptions.currentPage = event;
  }

  get remainEntries() {
    return this.readyOrders.length % this.tableOptions.itemsPerPage;
  }

  public searchOrders(): void {
    if (this.terms != null) {
      this.terms = this.terms.trim().toLowerCase();
      const isMatch = (order: OpenOrder) => {
        const isFound =
          order.client_name.toLowerCase().includes(this.terms) ||
          order.phone_num.toLowerCase().includes(this.terms);
        return isFound;
      };
      this.searchOrder = this.readyOrders.filter(isMatch);
      this.tableOptions.currentPage = 1;
    }
    this.terms == '' ? (this.searchOrder = this.readyOrders) : '';
  }

  clearSearch() {
    this.terms = null;
    this.searchOrder = this.readyOrders;
  }

  setToShipped(event: Event, id) {
    event.preventDefault();
    event.stopPropagation();
    this.orderService.setStatus(id, 5).subscribe((res: Resp) => {
      res.rc === 0 ? this.successNotify() : null;
      if (res.rc === 0) {
        this.successNotify();
        this.orderService.getReadyOrders(ReadyOrderFilter.READY_ORDER_PICKUP).subscribe((res) => {
          this.readyOrders = res.orders;
          this.searchOrder = this.readyOrders;
        });
      }
    });
  }

  openDetail(id) {
    const url = `/order/ready-orders-pickup/shop-page/detail/${id}`;
    window.open(url, '_blank');
  }

  successNotify() {
    const modalRef = this.modalService.open(NotifyModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.notify';
    modalRef.componentInstance.content = 'modal.success';
  }
}

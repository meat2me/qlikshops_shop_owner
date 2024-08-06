import { ReplaySubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { OpenOrders } from '@models/open-orders.model';
import { OrderDetail } from '@models/order-detail.model';
import { ReadyOrderFilter } from '@models/order-item.model';


@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {

  openOrderSubj = new ReplaySubject<OpenOrders>(1);
  openOrder$: Observable<OpenOrders>;

  readySubj = new ReplaySubject<OpenOrders>(1);
  readyOrders$: Observable<OpenOrders>;

  getOpenOrders() {
    this.post<OpenOrders>({ request: 'get_open_orders' }).subscribe((res) => this.openOrderSubj.next(res));
    return this.openOrder$ || (this.openOrder$ = this.openOrderSubj.asObservable());
  }


  getReadyOrders(filter_delivery_type: ReadyOrderFilter) {
    this.post<OpenOrders>({ request: 'get_ready_orders', filter_delivery_type }).subscribe((res) => {
      console.log(res);
      this.readySubj.next(res);
    });
    return this.readyOrders$ || (this.readyOrders$ = this.readySubj.asObservable());
  }

  getOrderDetail(order_id: number) {
    return this.post<OrderDetail>({ request: 'get_order_details', order_id });
  }

  getHistoryByRange(filter_from_date?: string, filter_to_date?: string, filter_search?: string) {
    return this.post<OrderDetail>({ request: 'get_closed_orders', filter_from_date, filter_to_date, filter_search });
  }

  sendMsg(client_id: string, message: string) {
    return this.post({ request: 'send_message_to_client', client_id, message });
  }

  setStatus(order_id, status) {
    return this.post({ request: 'set_order_status', order_id, status });
  }

  setProcess(order_id, item_id, is_processed) {
    return this.post({ request: 'set_order_item_processed', order_id, item_id, is_processed });
  }

  setAmount(order_id, item_id, amount) {
    return this.post({ request: 'set_order_item_amount', order_id, item_id, amount });
  }

  setOrderReady(order_id, actual_cost) {
    return this.post({ request: 'set_order_ready', order_id, actual_cost });
  }
}

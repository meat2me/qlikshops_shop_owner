import { Resp } from '@models/resp.model';
import { NotifyModalComponent } from '@modals/notify-modal/notify-modal.component';
import { ConfirmModalComponent } from '@modals/confirm-modal/confirm-modal.component';
import { OrderService } from '@services/order.service';
import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetail } from '@models/order-detail.model';
import { catchError, debounceTime, takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '@modals/alert-modal/alert-modal.component';
import { EMPTY, Subject } from 'rxjs';
import * as moment from 'moment';
import { modifyTime } from '@utils/modify-date';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  isNew = false;
  isProcessing = false;
  isCancelled = false;
  isReady = false;
  isShipped = false;
  isCheck = true;
  isAmountValid: boolean;
  temp;
  currency;
  orderTime;
  totalPrice = 0;
  amountChange$ = new EventEmitter();
  reqToProcess$ = new EventEmitter();
  items = [];
  // getting;
  orderDetail: OrderDetail;
  orderId;
  tempStatus;
  isPaying = false;
  private onDestroy$ = new Subject();

  messageForm = new FormGroup({
    title: new FormControl(true),
    message: new FormControl('', Validators.required),
  });

  itemForm: FormGroup;

  get title() {
    return this.messageForm.value.title;
  }

  get message() {
    return this.messageForm.value.message;
  }

  get itemControls() {
    return this.itemForm.get('items') as FormArray;
  }

  get allItemArr() {
    return this.itemForm.get('items') as FormArray;
  }

  getItemCtrl(index: number) {
    return this.itemControls.at(index) as FormGroup;
  }

  getAmountCtrl(index: number) {
    return this.getItemCtrl(index).get('amount') as FormControl;
  }

  getActualCtrl(index: number) {
    return this.getItemCtrl(index).get('actual_amount') as FormControl;
  }

  getPriceCtrl(index: number) {
    return this.getItemCtrl(index).get('price') as FormControl;
  }

  getProcessCtrl(index: number) {
    return this.getItemCtrl(index).get('is_processed') as FormControl;
  }

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.buildItemForm();
    this.itemForm.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        if (
          this.isNew != true &&
          this.isCancelled != true &&
          this.isReady != true &&
          this.isShipped != true
        ) {
          const result = res.items.filter((item) => item.is_processed == 1);
          if (this.isProcessing != true && this.temp != false) {
            result.length == 0
              ? (this.isProcessing = false)
              : (this.isProcessing = true);
          }
        }
        this.calTotalPrice(res.items);
      });
    // call api change amount here
    this.amountChange$
      .pipe(debounceTime(500))
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((index: any) => {
        this.setActualAmount(index);
        this.setCost(index);
      });
    this.reqToProcess$.subscribe((index: any) => {
      this.getItemCtrl(index).value.is_processed
        ? this.setItemProcess(index, 1)
        : this.setItemProcess(index, 0);
      this.orderDetail.status = null;
      this.orderService
        .setStatus(this.orderDetail.order_id, 3)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(() => {});
    });
  }

  ngOnInit(): void {
    this.currency = localStorage.getItem('CURRENCY');
    this.route.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe((params) => {
      this.orderId = params.get('order_id');
      this.orderService
        .getOrderDetail(parseInt(this.orderId))
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((res: OrderDetail) => {
          this.orderDetail = res;
          this.tempStatus = res.status;
          this.items = res.items;
          this.orderTime = modifyTime(this.orderDetail.order_time);
          this.initStatus(res.status);
          this.items.forEach((el) => {
            this.itemControls.push(this.createItemForm());
          });
          this.itemForm.patchValue({ items: this.items });
        });
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  buildItemForm() {
    this.itemForm = new FormGroup({
      items: new FormArray([]),
    });
  }

  createItemForm() {
    return new FormGroup({
      is_processed: new FormControl(null),
      item_id: new FormControl(null),
      amount: new FormControl(null),
      actual_amount: new FormControl(null),
      catalog_number: new FormControl(null),
      price: new FormControl(0),
      cost: new FormControl(0),
    });
  }

  sendMessage() {
    if (this.title) {
      const msg = `${this.message}`;
      this.orderService
        .sendMsg(this.orderDetail.client_id, msg)
        .subscribe((res: any) => {
          res.rc == 0 ? this.changedSuccessNotify() : null;
          this.messageForm.patchValue({
            message: null,
          });
        });
    }
  }

  setActualAmount(index) {
    if (!this.isAmountValid) {
      this.orderService
        .setAmount(
          this.orderDetail.order_id,
          this.orderDetail.items[index].item_id,
          this.getActualCtrl(index).value
        )
        .subscribe(() => {});
    } else {
      this.actualAmountError();
    }
  }

  setItemProcess(index, state) {
    this.orderService
      .setProcess(
        this.orderDetail.order_id,
        this.orderDetail.items[index].item_id,
        state
      )
      .subscribe(() => {});
  }

  calTotalPrice(arr) {
    let sum = 0;
    arr.forEach((el) => {
      el.is_processed ? (sum += el.price * el.actual_amount) : null;
    });
    this.totalPrice = sum;
  }

  setCost(index) {
    const result =
      this.getActualCtrl(index).value * this.getPriceCtrl(index).value;
    return result;
  }

  checkActualAmount(index, amount): void {
    this.getActualCtrl(index).value <= amount
      ? (this.isAmountValid = false)
      : (this.isAmountValid = false);
  }

  resetValue() {
    this.isNew =
      this.isProcessing =
      this.isCancelled =
      this.isReady =
      this.isShipped =
        false;
    this.orderDetail.status = null;
  }

  initStatus(status_code) {
    this.isNew =
      this.isProcessing =
      this.isCancelled =
      this.isReady =
      this.isShipped =
        false;
    status_code == 2 ? (this.isNew = true) : null;
    status_code == 3 ? (this.isProcessing = true) : null;
    status_code == 4 ? (this.isReady = true) : null;
    status_code == 5 ? (this.isShipped = true) : null;
    status_code == 6 ? (this.isCancelled = true) : null;
  }

  confirmChangeStatus(status_code) {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.changed_status_title';
    modalRef.componentInstance.content = 'modal.changed_status_content';
    modalRef.componentInstance.type = true;

    modalRef.result.then((result) => {
      if (result) {
        this.resetValue();
        if (status_code == 2) {
          this.isNew = true;
          this.allItemArr.enable();
        }
        if (status_code == 3) {
          this.isProcessing = true;
          this.allItemArr.enable();
        }
        if (status_code == 4 || status_code == 5 || status_code == 6) {
          this.temp = false;
          this.allItemArr.disable();
        }
        status_code == 4 ? (this.isReady = true) : null;
        status_code == 5 ? (this.isShipped = true) : null;
        status_code == 6 ? (this.isCancelled = true) : null;
        this.orderService
          .setStatus(this.orderDetail.order_id, status_code)
          .subscribe((res: any) => {
            if (res.rc == 0) {
              this.changedSuccessNotify();
            }
          });
      }
    });
  }

  changedSuccessNotify() {
    const modalRef = this.modalService.open(NotifyModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.notify';
    modalRef.componentInstance.content = 'modal.success';
  }

  makePaymentNotify(): void {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.make_payment_title';
    modalRef.componentInstance.content = 'modal.make_payment_content';

    modalRef.result.then((result: any) => {
      if (result) {
        this.isPaying = true;
        this.orderService
          .setOrderReady(parseInt(this.orderId), this.totalPrice)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              this.isPaying = false;
              return EMPTY;
            })
          )
          .subscribe((res: any) => {
            if (!res) {
              return;
            }
            this.resetValue();
            this.isReady = true;
            this.isPaying = false;
            if (this.orderDetail.is_payment_in_store) {
              this.payAtStoreModal();
            }
          });
      }
    });
  }

  actualAmountError(): void {
    const modalRef = this.modalService.open(AlertModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.actual_amount_error_title';
    modalRef.componentInstance.content = 'modal.actual_amount_error_content';

    modalRef.result.then((result) => {
      if (result) {
        for (let i = this.itemControls.length - 1; i >= 0; i--) {
          this.itemControls.removeAt(i);
        }
        this.ngOnInit();
      }
    });
  }

  increase(item: any): number {
    item.actual_amount =
      (item.actual_amount * 10 + item.amount_step * 5) / 10;
    item.actual_amount = item.actual_amount.toFixed(3);
    return ( item.actual_amount);
  }

  reduction(item: any): number {
    const temp = (item.actual_amount * 10 - item.amount_step * 5) / 10;
    if (temp < 0) {
      return;
    } else {
      item.actual_amount = temp;
      item.actual_amount = item.actual_amount.toFixed(3);
      return (item.actual_amount);
    }
  }

  payAtStoreModal(): void {
    const modalRef = this.modalService.open(NotifyModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.payment_in_store_title';
    modalRef.componentInstance.content = 'modal.payment_in_store_content';
    modalRef.componentInstance.setting = true;
  }
}

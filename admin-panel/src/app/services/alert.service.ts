import { Injectable } from '@angular/core';
import { AlertModalComponent } from '@modals/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from '@modals/confirm-modal/confirm-modal.component';
import { NotifyModalComponent } from '@modals/notify-modal/notify-modal.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private modalServ: NgbModal) { }

  showConfirmChanges() {
    return this.showConfirm('modal.confirm_to_save_title', 'modal.confirm_to_save_content', true);
  }

  showDiscardChanges() {
    return this.showConfirm('modal.cancel_change_title', 'modal.cancel_change_content', true);
  }

  showChangedSuccess(title = 'modal.changed_save_success_title', content = 'modal.changed_save_success_content') {
    return this.showNotification(title, content);
  }

  showDeleteSuccess(title = 'modal.delete_item_success_title', content = 'modal.delete_item_success_content') {
    return this.showNotification(title, content);
  }

  showPremiumFeature() {
    return this.showNotification('modal.premium_title', 'modal.premium_content');
  }

  showConfirm(title: string, content: string, isNotDanger = false, options: NgbModalOptions = { centered: true }) {
    const modal = this.modalServ.open(ConfirmModalComponent, options);
    const component = modal.componentInstance as ConfirmModalComponent;
    component.title = title;
    component.content = content;
    component.type = isNotDanger;
    return modal.result;
  }

  showAlert(errorTitle: string, errorMsg?: string, options: NgbModalOptions = { centered: true }) {
    const modal = this.modalServ.open(AlertModalComponent, options);
    const component = modal.componentInstance as AlertModalComponent;
    component.title = errorTitle;
    component.content = errorMsg || errorTitle;
    return modal.result;
  }

  showInfo(title: string, content?: string, options: NgbModalOptions = { centered: true }) {
    return this.showConfirm(title, content || title, true, options);
  }

  showNotification(title: string, content: string, options: NgbModalOptions = { centered: true }) {
    const modal = this.modalServ.open(NotifyModalComponent, options);
    const component = modal.componentInstance as NotifyModalComponent;
    component.title = title;
    component.content = content;
    return modal.result;
  }


}

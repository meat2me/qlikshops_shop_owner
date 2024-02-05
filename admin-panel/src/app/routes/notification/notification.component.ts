import { NotificationService } from '@services/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  Injectable,
} from '@angular/core';
import * as moment from 'moment';
import { PaginationInstance } from 'ngx-pagination';
import {
  NgbModal,
  NgbDateStruct,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmModalComponent } from '@modals/confirm-modal/confirm-modal.component';
import { NotifyModalComponent } from '@modals/notify-modal/notify-modal.component';
import { AuthService } from '@services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '@services/store.service';
import { AlertModalComponent } from '@modals/alert-modal/alert-modal.component';

@Injectable()
export class CustomNgbDatepicker extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
    return { day: 1, month: 1, year: 2020 };
  }
  format(date: NgbDateStruct) {
    return moment(date).format('DD[/]MM[/]YYYY');
  }
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationComponent implements OnInit {
  user_type;
  store_id = '';
  isSuccess = true;
  tableOptions: PaginationInstance;
  notifications = [];
  currentTime: any;
  customTime: string;
  isPro: any;
  constructor(
    private notificationService: NotificationService,
    private modalService: NgbModal,
    private authService: AuthService,
    private route: ActivatedRoute,
    private storeService: StoreService
  ) {
    this.tableOptions = {
      id: 'table',
      currentPage: 0,
      itemsPerPage: 3,
    };
  }

  notifyForm = new FormGroup({
    message: new FormControl('', Validators.required),
    send_on: new FormControl(null, Validators.required),
    audience: new FormControl(null, Validators.required),
    date_picker: new FormControl({ value: null, disabled: true }),
    time_picker: new FormControl({ value: null, disabled: true }),
  });

  get send_on() {
    return this.notifyForm.value.send_on;
  }

  get audience() {
    return this.notifyForm.value.audience;
  }

  get message() {
    return this.notifyForm.value.message;
  }

  get date_picker() {
    return this.notifyForm.get('date_picker');
  }

  get time_picker() {
    return this.notifyForm.get('time_picker');
  }

  ngOnInit(): void {
    this.user_type = this.authService.getUserType();
    this.store_id = localStorage.getItem('STORE_ID');
    this.route.paramMap.subscribe((params) => {
      const location = params.get('location');
      if (location == 'shop-page') {
        this.storeService.getSidebarChange(true);
        this.user_type = 3;
      }
    });
    this.getNotification();
    const now = moment().valueOf();

    this.currentTime = {
      year: moment(now).get('year'),
      month: moment(now).get('month'),
      day: moment(now).get('date'),
    };

    const hour = {
      hour: moment(now).get('hour'),
      minute: moment(now).get('minute'),
      second: 0,
    };

    this.notifyForm.patchValue({
      audience: 3,
      send_on: 0,
      date_picker: this.currentTime,
      time_picker: hour,
    });
  }

  formatDate(milliseconds) {
    return moment(milliseconds).format('YYYY[-]MM[-]DD HH:MM:SS');
  }

  formatDateToDisplay(milliseconds) {
    return moment(milliseconds).format('DD[/]MM[/]YYYY HH:MM');
  }

  modifyData = async () => {
    this.notifyForm.patchValue({
      audience: parseInt(this.audience),
    });
    if (this.send_on == 1) {
      const strDate = new Date(
        this.notifyForm.value.date_picker.year,
        this.notifyForm.value.date_picker.month,
        this.notifyForm.value.date_picker.day
      );
      const milliseconds = strDate.valueOf();
      const tempDate = moment(milliseconds).format('YYYY[-]MM[-]DD');

      if (this.notifyForm.value.time_picker.minute.toString().length == 1) {
        this.notifyForm.value.time_picker.minute =
          '0' + this.notifyForm.value.time_picker.minute;
      }

      this.customTime = `${tempDate} ${this.notifyForm.value.time_picker.hour}:${this.notifyForm.value.time_picker.minute}:${this.notifyForm.value.time_picker.second}0`;

      this.notifyForm.patchValue({
        send_on: this.customTime,
      });
    }
    if (this.send_on == 0) {
      this.notifyForm.patchValue({
        send_on: '',
      });
    }
  };

  errorNotify() {
    const modalRef = this.modalService.open(AlertModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.notify';
    modalRef.componentInstance.content = 'modal.error';
  }

  enableDateChoose() {
    this.date_picker.enable();
    this.time_picker.enable();
  }

  disableDateChoose() {
    this.date_picker.disable();
    this.time_picker.disable();
  }

  checkPremiumAcc() {
    if (!this.isPro) {
      this.premiumMsg();
      this.notifyForm.patchValue({
        audience: null,
      });
    }
  }

  sendNotification = async () => {
    await this.modifyData();
    if (this.user_type == 1) {
      this.notificationService
        .adminSendNotification(this.message, this.send_on, this.audience)
        .subscribe(
          (res: any) => {
            if (res.rc == 0) {
              this.getNotification();
              this.successNotify();
              this.notifyForm.patchValue({
                message: null,
                send_on: 0,
              });
            }
          },
          () => {
            this.errorNotify();
          }
        );
    } else {
      this.notificationService
        .ownerSendNotification(this.store_id, this.message, this.send_on)
        .subscribe(
          (res: any) => {
            if (res.rc == 0) {
              this.getNotification();
              this.successNotify();
              this.notifyForm.patchValue({
                message: null,
                send_on: 0,
              });
            }
          },
          () => {
            this.errorNotify();
          }
        );
    }
  };

  deleteNotification(id) {
    this.notificationService
      .deleteNotification(id, this.user_type, this.store_id)
      .subscribe((res: any) => {
        if (res.rc == 0) {
          this.getNotification();
          this.successNotify();
        }
      });
  }

  getNotification() {
    this.notificationService
      .getAllNotification(this.user_type, this.store_id)
      .subscribe((res: any) => {
        this.notifications = res.notifications;
        this.notifications.forEach((notify) => {
          notify.send_on = this.formatDateToDisplay(notify.send_on);
        });
        this.isPro = res.is_pro_account;
      });
  }

  confirmDelete(id) {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.delete_msg_title';
    modalRef.componentInstance.content = 'modal.delete_msg_content';

    modalRef.result.then((result) => {
      result ? this.deleteNotification(id) : null;
    });
  }

  successNotify() {
    const modalRef = this.modalService.open(NotifyModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.notify';
    modalRef.componentInstance.content = 'modal.success';
  }

  premiumMsg() {
    const modalRef = this.modalService.open(NotifyModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.premium_title';
    modalRef.componentInstance.content = 'modal.premium_content';
  }
}

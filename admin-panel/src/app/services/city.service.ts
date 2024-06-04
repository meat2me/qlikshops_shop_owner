import { Injectable } from '@angular/core';
import {Resp} from '@models/resp.model';
import {NotifyModalComponent} from '@modals/notify-modal/notify-modal.component';
import {StoreService} from '@services/store.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(
    private storeService: StoreService,
    private modalService: NgbModal,
  ) {}
  getCities() {
    this.storeService
      .getCities().subscribe((res: Resp) => {
      console.log(res);
      if (res.rc === 0) {
        this.successNotify();
      }});
    // });
  }
  successNotify() {
    // const modalRef = this.modalService.open(NotifyModalComponent, {
    //   centered: true,
    // });
    // modalRef.componentInstance.title = 'modal.notify';
    // modalRef.componentInstance.content = 'modal.success';
  }
}


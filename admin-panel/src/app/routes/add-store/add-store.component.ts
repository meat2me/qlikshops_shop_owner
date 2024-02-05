import { NotifyModalComponent } from '@modals/notify-modal/notify-modal.component';
import { StoreService } from '@services/store.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@modals/confirm-modal/confirm-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddStoreComponent implements OnInit {
  @ViewChild('upFile', { static: false }) upFile: ElementRef;
  @ViewChild('upLogoWhite', { static: false }) upLogoWhite: ElementRef;
  @ViewChild('upLogoBlack', { static: false }) upLogoBlack: ElementRef;

  public logoWhite = '';
  public logoBlack = '';

  languages: any;
  countries: any;
  themes: any;
  storeCategories: any;
  units: any;
  paymentOptions: any;
  customUnits: any;
  storeForm: FormGroup;
  storeStatus;
  originData;
  fileName;
  currentTime;
  tomorrowTime;
  isDateValid: boolean;

  buildStoreForm() {
    this.storeForm = new FormGroup({
      owner_first_name: new FormControl(null, Validators.required),
      owner_last_name: new FormControl(null, Validators.required),
      owner_phone: new FormControl(null, Validators.required),
      owner_email: new FormControl(null, Validators.required),
      store_code: new FormControl(null, Validators.required),
      store_name: new FormControl(null, Validators.required),
      about: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      store_phone: new FormControl(null, Validators.required),
      store_email: new FormControl(null, Validators.required),
      open_hours: new FormControl(null, Validators.required),
      take_away_hours: new FormControl(null, Validators.required),
      has_take_away: new FormControl(false, Validators.required),
      has_delivery: new FormControl(false, Validators.required),
      delivery_hours: new FormControl(null, Validators.required),
      delivery_cost: new FormControl(null, Validators.required),
      min_order_for_free_delivery: new FormControl(null, Validators.required),
      distribution_area: new FormControl(null, Validators.required),
      image_logo_white: new FormControl(null),
      image_logo_black: new FormControl(null),
    });
  }

  constructor(
    private storeService: StoreService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.buildStoreForm();
  }

  ngOnInit(): void {}

  onAddStore = async () => {
    const req = {
      ...this.storeForm.value,
    };
    this.storeService.addStore(req).subscribe((res: any) => {
      if (res.rc == 0) {
        this.successNotify();
        this.router.navigate(['/store/admin-page']);
        this.storeService.getNavChange(true);
      }
    });
  };

  onCancel() {
    this.router.navigate(['/home']);
  }

  addSuccessModal() {
    const modalRef = this.modalService.open(NotifyModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.changed_save_title';
    modalRef.componentInstance.content = 'modal.changed_save_content';
    modalRef.componentInstance.setting = true;
  }

  confirmCancel() {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.cancel_change_title';
    modalRef.componentInstance.content = 'modal.cancel_change_content';

    modalRef.result.then((result) => {
      result ? this.onCancel() : null;
    });
  }

  successNotify() {
    const modalRef = this.modalService.open(NotifyModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.notify';
    modalRef.componentInstance.content = 'modal.success';
  }

  // *upload logo section

  private _initLogoDisplay(logoWhite: string, logoBlack: string): void {
    this.logoBlack = logoBlack;
    this.logoWhite = logoWhite;
  }

  public uploadWhiteLogo() {
    this.upLogoWhite.nativeElement.click();
  }

  public uploadBlackLogo() {
    this.upLogoBlack.nativeElement.click();
  }

  public readFileLogoWhite(fileEvent: any) {
    const file = fileEvent.target.files[0];
    this.fileName = file.name;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      this.logoWhite = e.target.result;
      this.storeForm.patchValue({
        image_logo_white: this.logoWhite,
      });
    };
  }

  public readFileLogoBlack(fileEvent: any) {
    const file = fileEvent.target.files[0];
    this.fileName = file.name;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      this.logoBlack = e.target.result;
      this.storeForm.patchValue({
        image_logo_black: this.logoBlack,
      });
    };
  }
}

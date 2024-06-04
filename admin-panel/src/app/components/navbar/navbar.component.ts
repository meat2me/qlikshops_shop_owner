import { StoreService } from '@services/store.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription, ReplaySubject } from 'rxjs';
import { BreadcrumbService, IBreadcrumb } from '@services/breadcrumb.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  store;
  userType = this.authServ.getUserType();
  breadCrumbSub: ReplaySubject<IBreadcrumb[]>;
  subs: Array<Subscription> = [];
  constructor(
    private storeService: StoreService,
    private breadCrumbServ: BreadcrumbService,
    private authServ: AuthService
  ) {
    this.breadCrumbSub = this.breadCrumbServ.breadCrumbSub;
  }

  ngOnInit(): void {
    this.getStoreInfo();
    this.storeService.updateNavbar.subscribe((res) => {
      res ? this.getStoreInfo() : null;
    });
  }

  getStoreInfo() {
    this.storeService.getStoreMetadata().subscribe((res: any) => {
      this.store = res;
      if (res.currency) {
        // console.log(res);
        localStorage.setItem('CURRENCY', res.currency);
        localStorage.setItem('DISCOUNT_CURRENCY', res.currency);
      }
    });
    // this.storeService.getStoreInfo().subscribe((res: any) => {
    //   this.store = res;
    //   if (res.currency) {
    //     console.log(res);
    //     localStorage.setItem('CURRENCY', res.currency);
    //     localStorage.setItem('DISCOUNT_CURRENCY', res.currency);
    //   }
    // });
  }

  ngAfterViewInit() { }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}

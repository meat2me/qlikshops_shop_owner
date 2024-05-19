import { StoreService } from '@services/store.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Logout } from '@core/redux/actions/auth.action';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public is_online = false;
  public data: any;
  public clientsPerMonth: any;
  public ordersPerMonth: any;
  public currency: any;
  public storeId: any;

  constructor(
    private storeService: StoreService,
    private store: Store<any>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currency = localStorage.getItem('CURRENCY');
    this.identifyLocation();
    this.chooseDashDataMode();
    this.onListenDashboardUpdate();
  }

  public getStoreDashboardData(storeId: string) {
    this.storeService.getDashboard(storeId).subscribe((res: any) => {
      this.data = res;
      this.clientsPerMonth = res.clients_per_month;
      this.ordersPerMonth = res.orders_per_month;
    });
  }

  public getAllStoreDashboard(): void {
    this.storeService.getDashboard().subscribe((res: any) => {
      this.data = res;
      this.clientsPerMonth = res.clients_per_month;
      this.ordersPerMonth = res.orders_per_month;
    });
  }

  public identifyLocation(): void {
    this.route.paramMap.subscribe((params) => {
      const location = params.get('role');
      if (location == 'shop-page') {
        this.storeService.getSidebarChange(true);
      }
    });
  }

  public chooseDashDataMode(): void {
    const storeId = localStorage.getItem('STORE_ID');
    if (storeId) {
      this.getStoreDashboardData(storeId);
    } else {
      this.getAllStoreDashboard();
    }
  }

  public onListenDashboardUpdate() {
    this.storeService.updateDashboard.subscribe((res: any) => {
      res ? this.chooseDashDataMode() : null;
    });
  }

  public clearCache(): void {
    this.data = null;
    this.clientsPerMonth = null;
    this.ordersPerMonth = null;
  }

  public out() {
    this.store.dispatch(new Logout());
  }
}

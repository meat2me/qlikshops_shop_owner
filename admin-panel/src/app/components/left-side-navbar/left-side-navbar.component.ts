import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmModalComponent } from '@modals/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AuthService } from '@services/auth.service';
import { StoreService } from '@services/store.service';
import { Logout } from '@core/redux/actions/auth.action';

@Component({
  selector: 'app-left-side-navbar',
  templateUrl: './left-side-navbar.component.html',
  styleUrls: ['./left-side-navbar.component.scss'],
})
export class LeftSideNavbarComponent implements OnInit {
  mainMenu;
  store_id = '';
  isAdmin = false;
  isMobile = false;
  private _routerSubscription: any;
  // userType = localStorage.getItem('USER_TYPE');
  userType = 1;
  adminMenu = [
    {
      name: 'navigation.dashboard',
      icon: 'fas fa-signal',
      route: '/home',
      params: 'admin-page',
      isOpen: false,
    },
    {
      name: 'navigation.store',
      icon: 'fas fa-store',
      route: '/store',
      params: 'admin-page',
      isOpen: false,
    },
    {
      name: 'navigation.content',
      icon: 'fas fa-edit',
      route: '/content/notification',
      isOpen: false,
      children: [
        {
          name: 'navigation.categories',
          route: '/content/categories',
          params: 'admin-page',
        },
        {
          name: 'navigation.items',
          route: '/content/items',
          params: 'admin-page',
        },
        {
          name: 'navigation.notifications',
          route: '/content/notification',
          params: 'admin-page',
        },
        {
          name: 'navigation.recipes',
          route: '/content/recipes',
          params: 'admin-page',
        },
      ],
    },
    {
      name: 'navigation.report',
      icon: 'fas fa-file',
      route: '/report',
      isOpen: false,
      children: [
        {
          name: 'navigation.last12month',
          route: '/reports/monthly-report',
          params: 'admin-page',
        },
        // {
        //   name: 'navigation.visitors',
        //   route: '/report/visitors',
        //   params: 'admin-page',
        // },
        // {
        //   name: 'navigation.analytics',
        //   route: '/report/analytics',
        //   params: 'admin-page',
        // },
      ],
    },
  ];

  //   -------------------------------------

  ownerMenu = [
    {
      name: 'navigation.dashboard',
      icon: 'fas fa-signal',
      route: `/home`,
      params: 'shop-owner',
      isOpen: false,
    },
    {
      name: 'navigation.order',
      icon: 'fas fa-shopping-cart',
      route: '/order/open-orders/admin-role',
      params: 'shop-page',
      isOpen: false,
      children: [
        {
          name: 'navigation.open_order',
          route: `/order/open-orders`,
          params: 'shop-page',
        },
        {
          name: 'navigation.ready_order_pickup',
          route: '/order/ready-orders-pickup',
          params: 'shop-page',
        },
        {
          name: 'navigation.ready_order_delivery',
          route: '/order/ready-orders-delivery',
          params: 'shop-page',
        },
        {
          name: 'navigation.history',
          route: '/order/history',
          params: 'shop-page',
        },
        {
          name: 'navigation.client',
          route: '/order/clients',
          params: 'shop-page',
        },
      ],
    },
    {
      name: 'navigation.content',
      icon: 'fas fa-edit',
      route: '/content/notification',
      isOpen: false,
      children: [
        {
          name: 'navigation.categories',
          route: '/content/categories',
          params: 'shop-owner',
        },
        {
          name: 'navigation.items',
          route: '/content/items',
          params: 'shop-owner',
        },
        {
          name: 'navigation.notifications',
          route: '/content/notification',
          params: 'shop-owner',
        },
      ],
    },
    {
      name: 'navigation.store_setting',
      icon: 'fas fa-cog',
      route: '/settings/store',
      isOpen: false,
      params: 'shop-owner',
    },
    {
      name: 'navigation.report',
      icon: 'fas fa-file',
      route: '/reports',
      params: 'shop-owner',
      isOpen: false,
      children: [
        {
          name: 'navigation.last12month',
          route: '/reports/monthly-report',
          params: 'shop-owner',
        },
        // {
        //   name: 'navigation.visitors',
        //   route: '/report/visitors',
        //   params: 'shop-owner',
        // },
        // {
        //   name: 'navigation.analytics',
        //   route: '/report/analytics',
        //   params: 'shop-owner',
        // },
      ],
    },
  ];

  //-----------------------------------------

  ownerMenuForAdmin = [
    {
      name: 'navigation.dashboard',
      icon: 'fas fa-signal',
      route: `/home`,
      params: 'shop-page',
      isOpen: false,
    },
    {
      name: 'navigation.content',
      icon: 'fas fa-edit',
      route: '/content/notification',
      isOpen: false,
      children: [
        {
          name: 'navigation.categories',
          route: '/content/categories',
          params: 'shop-page',
        },
        {
          name: 'navigation.items',
          route: '/content/items',
          params: 'shop-page',
        },
        {
          name: 'navigation.notifications',
          route: '/content/notification',
          params: 'shop-page',
        },
      ],
    },
    {
      name: 'navigation.store_setting',
      icon: 'fas fa-cog',
      route: '/settings/store',
      isOpen: false,
      params: 'shop-page',
    },
    {
      name: 'navigation.report',
      icon: 'fas fa-file',
      route: '/report',
      params: 'shop-page',
      isOpen: false,
      children: [
        {
          name: 'navigation.last12month',
          route: '/reports/monthly-report',
          params: 'shop-page',
        },
        // {
        //   name: 'navigation.visitors',
        //   route: '/report/visitors',
        //   params: 'shop-page',
        // },
        // {
        //   name: 'navigation.analytics',
        //   route: '/report/analytics',
        //   params: 'shop-page',
        // },
      ],
    },
  ];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private store: Store<any>,
    private storeService: StoreService
  ) {
    this.store_id = localStorage.getItem('STORE_ID');
    this.mainMenu = this.adminMenu;
  }

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
    if (this.userType == 1) {
      const menu = localStorage.getItem('ADMIN_MENU');
      if (menu) {
        this.mainMenu = JSON.parse(menu);
      }
    }

    this.storeService.updateSidebar.subscribe((res) => {
      if (res) {
        this.isAdmin = true;
      }

      this.mainMenu = this.ownerMenuForAdmin;
      const menu = localStorage.getItem('STORE_MENU');
      if (menu) {
        this.mainMenu = JSON.parse(menu);
      }
    });

    if (this.userType == 3) {
      this.mainMenu = this.ownerMenu;
      const menu = localStorage.getItem('OWNER_MENU');
      if (menu) {
        this.mainMenu = JSON.parse(menu);
      }
    }
  }

  logOut() {
    this.store.dispatch(new Logout());
    localStorage.clear();
  }

  confirmLogout() {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.logout_title';
    modalRef.componentInstance.content = 'modal.logout_content';

    modalRef.result.then((result) => {
      result ? this.logOut() : null;
    });
  }

  changeOpenStatus(menu) {
    menu.isOpen = !menu.isOpen;
    if (this.userType == 1 && this.isAdmin == false) {
      localStorage.setItem('ADMIN_MENU', JSON.stringify(this.mainMenu));
    }
    if (this.userType == 3) {
      localStorage.setItem('OWNER_MENU', JSON.stringify(this.mainMenu));
    }
    if (this.isAdmin) {
      localStorage.setItem('STORE_MENU', JSON.stringify(this.mainMenu));
    }
  }

  openMobileMenu = () => {
    this.isMobile = !this.isMobile;
  };

  routerInMobile = (route, params) => {
    this.router.navigate([route, params]);
    this.isMobile = false;
  };

  backToAdmin() {
    this.router.navigate(['/home/admin-page']);
    this.mainMenu = this.adminMenu;
    this.isAdmin = false;
    localStorage.removeItem('STORE_ID');
    if (!localStorage.getItem('STORE_ID')) {
      this.storeService.fetchDashboard();
    }
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

export interface IBreadcrumb {
  url: string;
  label: string;
  unclickable?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  public readonly breadCrumbSub = new ReplaySubject<IBreadcrumb[]>(1);
  public breadcrumbs: IBreadcrumb[] = [];
  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged(),
        map(() => this.buildBreadCrumb(this.activeRoute.root)),
        tap((b) => (this.breadcrumbs = b))
      )
      .subscribe((v) => this.breadCrumbSub.next(v));
  }

  private buildBreadCrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: IBreadcrumb[] = []
  ): Array<IBreadcrumb> {
    // If no routeConfig is available we are on the root path
    const label = route.routeConfig
      ? route.routeConfig.data?.breadcrumb
      : 'navigation.home';
    // const path: string = route.routeConfig ? route.routeConfig.path : '';
    const path: string = route.snapshot.url
      .map((x) => x.path)
      .filter((p) => p !== '')
      .join('/');
    const unclickable: boolean = route.routeConfig
      ? route.routeConfig.data?.unclickable
      : false;
    const usePrevUrl: boolean = route.routeConfig
      ? route.routeConfig.data?.usePrevUrl
      : false;
    if (!label) {
      const nextPath = path === '' ? url : `${url}/${path}`;
      return route.firstChild
        ? this.buildBreadCrumb(route.firstChild, nextPath, breadcrumbs)
        : breadcrumbs;
    }
    const nextUrl = `${url}/${path}`.replace('//', '/');
    let breadcrumbUrl = '';
    if (usePrevUrl) {
      const prevBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
      breadcrumbUrl = prevBreadcrumb?.url || nextUrl;
    } else {
      breadcrumbUrl = nextUrl;
    }
    const breadcrumb: IBreadcrumb = {
      label,
      url: breadcrumbUrl,
      unclickable,
    };
    const newBreadcrumbs = [...breadcrumbs, breadcrumb];
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcrumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }

  pushBreadcrumb(breadcrumb: IBreadcrumb) {
    this.breadCrumbSub.next([...this.breadcrumbs, breadcrumb]);
  }
}

import { ErrorResp } from './../models/resp.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { environment as env } from '@env/environment';
import { selectAuthState } from '@core/redux/app.states';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifyModalComponent } from '@modals/notify-modal/notify-modal.component';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private customHeaders = new HttpHeaders();
  token;
  store_id;

  constructor(protected http: HttpClient, protected store: Store<any>, private modalService: NgbModal,) {
    this.customHeaders.append('Content-Type', 'application/json');
    this.getToken().subscribe(token => {
      this.token = token;
    });
    this.getStoreId().subscribe(store_id => {
      this.store_id = store_id;
    });
  }

  post<T = {}>(body, options?) {
    return this.http.post<T>(env.URL, { ...body, token: this.token }, { ...this.customHeaders, ...options }).pipe(
      tap((res: any) => {
        if (res.rc) { throw res; }
      }),
      catchError(errResp => this.handleError(errResp))
    ) as Observable<T>;
  }

  get<T = {}>(params, options?) {
    let url = env.URL + (params ? '?' : '');
    Object.keys(params).forEach((key, index) => {
      if (params[key]) {
        url += `${key}=${params[key]}`;
      }
    });
    return this.http.get<T>(url, { ...this.customHeaders, ...options }).pipe(
      map((response) => response),
      catchError(errResp => this.handleError(errResp))
    );
  }

  getFile = (fileURL, options?): Observable<any> => {
    return this.http.get(fileURL, { ...this.customHeaders, ...options }).pipe(
      map((response) => response),
      catchError(errResp => this.handleError(errResp))
    );
  }

  protected handleError(error: ErrorResp) {
    this.errorModal(error.message);
    return throwError(error);
  }

  public getToken() {
    return this.store.select(selectAuthState).pipe(
      map((res: any) => res.token)
    );
  }

  public getStoreId() {
    return this.store.select(selectAuthState).pipe(
      map((res: any) => res.store_id)
    );
  }

  public errorModal(errStr) {
    const modalRef = this.modalService.open(NotifyModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.error';
    modalRef.componentInstance.content = errStr;
  }

}

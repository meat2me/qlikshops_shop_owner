import { ClientService } from '@services/client.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClientDetail } from '@models/client-detail.model';
import { BreadcrumbService } from '@services/breadcrumb.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  clientDetail: ClientDetail;
  commentCtrl = new FormControl('');
  customMessCtrl = new FormControl(true);
  messageCtrl = new FormControl('');
  currency;

  constructor(
    private route: ActivatedRoute,
    private clientServ: ClientService,
    private breadcrumbServ: BreadcrumbService,
  ) { }

  ngOnInit(): void {
    this.currency = localStorage.getItem('CURRENCY')
    this.clientDetail = this.route.snapshot.data.clientDetail;
    this.patchValues();
    this.updateBreadCrumb();
  }

  private updateBreadCrumb() {
    const {
      first_name,
      last_name,
      client_id,
    } = this.clientDetail;

    this.breadcrumbServ.pushBreadcrumb({
      label: `${first_name} ${last_name}`,
      url: `/order/clients/details/${client_id}`
    });

  }

  private get clientId() {
    return this.clientDetail.client_id;
  }

  private get usePrefix() {
    return this.customMessCtrl.value;
  }

  private patchValues() {
    this.commentCtrl.patchValue(this.clientDetail.comment);
  }

  public saveComment() {
    if (this.commentCtrl.pristine) { return; }

    const comment = this.commentCtrl.value;
    this.clientServ.setClientComment({ comment, client_id: this.clientId }).subscribe((res) => {
      this.commentCtrl.reset(comment);
    });
  }

  public sendMessage() {
    if (this.messageCtrl.pristine) { return; }

    let message = this.messageCtrl.value;
    if (this.usePrefix) {
      message = `${this.clientDetail.client_message_prefix} ${message}`;
    }

    this.clientServ.sendMessageToClient({ client_id: this.clientId, message }).subscribe((res) => {
      this.messageCtrl.reset('');
    });
  }
}

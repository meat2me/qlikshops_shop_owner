import { Resp } from './../models/resp.model';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Clients } from '@models/clients.model';
import { ClientDetail } from '@models/client-detail.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService {

  public getClients(search_string = '') {
    return this.post<Clients>({ search_string, request: 'get_clients' });
  }

  public getClient(client_id: string) {
    return this.post<ClientDetail>({ client_id, request: 'get_client' });
  }

  public setClientComment(req: ISetClientCommentReq) {
    return this.post<Resp>({ ...req, request: 'set_client_comment' });
  }

  public sendMessageToClient(req: ISendMessageToClientReq) {
    return this.post<Resp>({ ...req, request: 'send_message_to_client' });
  }
}

export interface ISetClientCommentReq {
  client_id: string;
  comment: string;
}

export interface ISendMessageToClientReq {
  client_id: string;
  message: string;
}

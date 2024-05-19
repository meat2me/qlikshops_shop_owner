import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends BaseService {
  adminSendNotification(message: string, send_on: string, audience: number) {
    return this.post({
      request: 'admin_send_notification',
      message,
      send_on,
      audience,
    });
  }

  ownerSendNotification(store_id: string, message: string, send_on: string) {
    return this.post({
      request: 'owner_send_notification',
      store_id,
      message,
      send_on
    });
  }

  getAllNotification(type: number, store_id) {
    if(type == 1) {
      return this.post({request: 'admin_get_notifications'});
    }

    if(type == 3) {
      return this.post({request: 'owner_get_notifications', store_id});
    }
  }

  deleteNotification(notification_id: number, type: number, store_id?) {
    if(type == 1) {
      return this.post({request: 'admin_delete_notification', notification_id});
    }
    if(type == 3) {
      return this.post({request: 'owner_delete_notification', store_id, notification_id});
    }
  }
}

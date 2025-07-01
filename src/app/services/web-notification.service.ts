import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationModel } from '../models/notification-model';

@Injectable({
  providedIn: 'root'
})
export class WebNotificationService {

  notifications = new NotificationModel();
  notification$ = new BehaviorSubject<NotificationModel>(this.notifications)

  constructor() { }

  emitNotification(notification: NotificationModel) {
    this.notification$.next(notification);
  }

}

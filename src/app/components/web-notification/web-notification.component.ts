import { Component } from '@angular/core';
import { WebNotificationService } from '../../services/web-notification.service';
import { NotificationModel } from '../../models/notification-model';
import { generate } from 'rxjs';
import { generateId } from '../../helpers/utils';

@Component({
  selector: 'app-web-notification',
  templateUrl: './web-notification.component.html',
  styleUrl: './web-notification.component.css'
})
export class WebNotificationComponent {

  notifications: NotificationModel[] = [];

  constructor(private webNotificationService: WebNotificationService) { }

  ngOnInit(){
    this.webNotificationService.notification$.subscribe({
      next:(notification:NotificationModel) => {
        if(notification?.message){
          notification._id = generateId();
          const audio = document.createElement('audio');
          audio.src = "/assets/audios/success.wav";
          audio.play();
          this.notifications.push(notification);
          setTimeout(()=>{
            this.notifications = this.notifications.filter((notif:NotificationModel) => notif._id !== notification._id);   
          }, notification.timeout);
        }
      }
    })
  }

}

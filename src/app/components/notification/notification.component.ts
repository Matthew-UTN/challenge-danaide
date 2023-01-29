import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { notifications } from 'src/app/models/notifications';
import { SurveillanceService } from 'src/app/services/surveillance.service';
import { ViewImageComponent } from './view-image/view-image.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: notifications[] = [];

  image:string;

  constructor(
    private surveillanceService: SurveillanceService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getNotifications();
    setInterval(() => {
      this.getNotifications();
    }, 1000);
  }

  getNotifications() {
    this.surveillanceService.getNotifications().subscribe(data => {
      let notificationArray = data as notifications[];
      this.notifications.reverse();
      if(notificationArray[0]){
        this.notifications.push(notificationArray[0]);
      }
      this.notifications.reverse();
    });
  }
  viewImage(id:number){
    var image = this.surveillanceService.getEventImage(id);
    this.dialog.open(ViewImageComponent, {
      data: {image: image}, width: '600px', 
    });
  }

  getImage(id:number){
    return this.surveillanceService.getEventImage(id);
  }
}

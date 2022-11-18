import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { notifications } from '../services/dataModels';
import { NotificationService } from '../services/notification.service';
import { UserDataService } from '../services/user-data.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  @Input('db') db : IDBDatabase;
  @ViewChild('modalButton')
    modalButton;
  notifs : IDBObjectStore;
  notificationArray : notifications[];
  loading = true; 
  selectedNotif = null;
  constructor(private ds : UserDataService, private notification: NotificationService) { 

  }


  get_notifications() {
    const tx = this.db.transaction(['notifs'], 'readwrite')
    const store = tx.objectStore('notifs')
    const notifications = store.get(1);
    tx.oncomplete = () => { 
       this.loading = false;
      // if(notifications.result instanceof Array)
      //  this.notificationArray =  notifications.result[0]
      // else 
         this.get_notifications_from_server();
    }
    tx.onerror = () => {
      console.log(tx.error)
      this.get_notifications_from_server();
    };
  } 

  get_notifications_from_server() {
    this.loading = true;
    this.ds.get_notifications().subscribe((response)=>{
      this.loading = false;
      if(response.status) {
        this.notificationArray = response.data;
        this.save_notifs(response.data);
      } else {
        alert(response.message);
        console.log(response);
      }
    }, (error) => {
      this.loading = false;
      if(error instanceof ErrorEvent)
        alert('sorry some unknown error occured in the browser');
      else 
        alert(`${error.status} : ${error.error.message}`);
    });
  }

  save_notifs(data) {
    if(this.db) {
      const tx = this.db.transaction(['notifs'], 'readwrite');
      const store = tx.objectStore('notifs');
      store.add(data);
      tx.oncomplete = () => {     
      }
    } else {
      localStorage.setItem('notifs', JSON.stringify(data));
    }
  }

  ngOnInit(): void {
    this.get_notifications();
  }

  check_notif(notif){
     this.notification.showNotif(notif);
  }

}

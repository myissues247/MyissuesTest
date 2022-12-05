import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notification$ = new Subject();
  constructor() { }

  showNotif(notif) {
    this.notification$.next(notif);
  }
}

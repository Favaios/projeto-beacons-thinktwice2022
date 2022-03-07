import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Alert from '../interfaces/Alert';
import StoredAlert from '../interfaces/StoredAlert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  idealAlertAmount = 4
  alerts: StoredAlert[] = []

  unseenMessages: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor() { }

  addAlert (alert: Alert) {
    this.alerts = [ { ...alert, image: this.genImage(), seen: false }, ...this.alerts ]

    this.unseenMessages.next(this.unseenMessages.value + 1)

    let unseen = this.unseenNotifications().length
    if (this.alerts.length > this.idealAlertAmount) this.alerts = this.alerts.slice(0, unseen > this.idealAlertAmount ? unseen : this.idealAlertAmount )
  }

  openNotifications () {
    this.unseenMessages.next(0)
    this.alerts = this.alerts.map(alert => { alert.seen = true; return alert })
  }

  private seenNotifications () {
    return this.alerts.filter(alert => alert.seen)
  }

  private unseenNotifications () {
    return this.alerts.filter(alert => !alert.seen)
  }

  private genImage () {
    let opts = ['', '_1', '_2', '_3']
    return '/assets/img/undraw_profile' + opts[Math.floor(Math.random()*opts.length)] + '.svg'
  }
}

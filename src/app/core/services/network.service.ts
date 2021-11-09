import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  public appIsOnline$: Observable<boolean>;

  constructor() {

    this.initConnectivityMonitoring();

  }

  private initConnectivityMonitoring() {

    if (!window || !navigator || !('onLine' in navigator)) return;

    this.appIsOnline$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    ).pipe(map(() => navigator.onLine))

  }
}

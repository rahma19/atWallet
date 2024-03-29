import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './core/services/auth.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

const TOKEN_KEY = 'access_token';
export function tokenGetter() {
  return localStorage.getItem('access_token');
}
import {
  JwtHelperService,
  JwtModule,
  JwtModuleOptions,
} from '@auth0/angular-jwt';
import { PipesModule } from 'src/shared/pipes.module';
import { Network } from '@ionic-native/network/ngx';
import { TransactionService } from './core/services/transaction.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AfficheTransactionComponent } from './pages/affiche-transaction/affiche-transaction.component';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter,
  },
};
@NgModule({
  declarations: [AppComponent, AfficheTransactionComponent],
  entryComponents: [AfficheTransactionComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    PipesModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    JwtModule.forRoot(JWT_Module_Options),
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    Network,
    TransactionService,
    BarcodeScanner,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

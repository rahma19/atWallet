import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { NetworkService } from 'src/app/core/services/network.service';
import { TransactionService } from 'src/app/core/services/transaction.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  user = null;
  transaction: any[] = [];
  datedeb: any;
  datefin: any;
  isConnected: boolean;
  solde: any;
  tt: Observable<any[]>
  check: any;

  constructor(private authService: AuthService, private alertController: AlertController, private router: Router, public toastController: ToastController, private transService: TransactionService, private connectivity: NetworkService) {

  }

  async ngOnInit(): Promise<void> {
    this.user = this.authService.payload;
    this.solde = this.user.solde;

    this.connectivity.appIsOnline$.subscribe(async online => {

      console.log(online)

      if (online) {
        await this.getAllTransactions();

        console.log("App is online")

      } else {
        console.log(this.transService.transactionSubject.value);
        // this.user = this.authService.payload;
        // this.solde = this.user.solde;
        this.transaction = this.transService.transactionSubject.value;
        console.log("App is offline")

      }
      this.check = online;

    })
    console.log(this.transaction);

    // var d = new Date();
    // this.datedeb = moment(d).format("YYYY-MM-DD");

  }

  getAllTransactions() {

    this.datedeb = '2021-10-25';
    let datefin = '2021-10-28';
    this.transService.getAllTransaction(this.datedeb, datefin, this.user.idCompte);
    this.transService.allTransactions$.subscribe(res => {
      this.transaction = res;
      console.log(this.transaction);

    });

  }

  refrech() {
    this.transService.getSolde(this.user.idCompte);
    this.solde = this.transService.soldeSubject.value;
  }


  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async nav() {
    if (this.check) {
      this.router.navigate(['recharge-tel']);
    }
    else {
      const alert = await this.alertController.create({
        header: 'Échec de la connexion',
        message: 'vérifier votre connexion',
        buttons: ['OK'],
      });

      alert.present();
    }
  }

  async navQR() {
    if (this.check) {
      this.router.navigate(['paiement-qr']);
    }
    else {
      const alert = await this.alertController.create({
        header: 'Échec de la connexion',
        message: 'vérifier votre connexion',
        buttons: ['OK'],
      });

      alert.present();
    }
  }
}

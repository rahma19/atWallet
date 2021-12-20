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
  loading = false;

  constructor(private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    public toastController: ToastController,
    private transService: TransactionService,
    private connectivity: NetworkService) {

  }

  async ngOnInit(): Promise<void> {

    this.user = await this.authService.payload;

    //check network
    this.connectivity.appIsOnline$.subscribe(async online => {
      console.log(online)
      if (online) {
        await this.refrech();
        await this.getAllTransactions();
        console.log("App is online")
      } else {
        //  this.solde = this.user.solde;
        this.transService.solde$.subscribe((res) => {
          this.solde = res;
        });
        this.transService.allTransactions$.subscribe(res => {
          this.transaction = res;
        });
        console.log("App is offline")
      }
      this.check = online;
    })
  }

  //get all transactions
  async getAllTransactions() {
    // var d = new Date();
    // this.datefin = moment(d).format("YYYY-MM-DD");
    // this.datedeb = '2021-10-25';
    await this.transService.getAllTransaction(this.user.idCompte);//this.datedeb, this.datefin,
    this.transService.allTransactions$.subscribe(res => {
      console.log(res);
      for (let i = 0; i < res.length; i++)
        res[i].dateTransaction = moment(res[i].dateTransaction).format('DD/MM/YYYY HH:mm');
      this.transaction = res;

    });
  }

  //refresh balance
  async refrech() {
    this.transService.getSolde(this.user.idCompte);
    this.transService.solde$.subscribe((res) => {
      this.solde = res;
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  //navigate to recharge interface
  async nav() {
    if (this.check) {
      this.router.navigate(['recharge-tel']);
    }
    else {
      const alert = await this.alertController.create({
        header: 'Échec',
        message: 'vérifier votre connexion',
        buttons: ['OK'],
      });
      alert.present();
    }
  }

  //navigate to QR code interface
  async navQR() {
    if (this.check) {
      this.router.navigate(['paiement-qr']);
    }
    else {
      const alert = await this.alertController.create({
        header: 'Échec',
        message: 'vérifier votre connexion',
        buttons: ['OK'],
      });
      alert.present();
    }
  }


}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, PopoverController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { AfficheTransactionComponent } from '../affiche-transaction/affiche-transaction.component';

@Component({
  selector: 'app-detail-achat',
  templateUrl: './detail-achat.page.html',
  styleUrls: ['./detail-achat.page.scss'],
})
export class DetailAchatPage implements OnInit {
  achat: any[];
  montant = 0;
  nomMag: any;
  nom: any;
  ville: any;
  credentials: FormGroup;
  user: any;
  data: any;
  solde: any;

  constructor(private authService: AuthService,
    private transactionService: TransactionService,
    private fbdr: FormBuilder,
    public toastController: ToastController,
    private router: Router,
    private transaService: TransactionService,
    public popoverController: PopoverController) { }

  async ngOnInit() {
    this.credentials = this.fbdr.group({
      numtel: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
    });

    //get data 
    this.achat = await this.transactionService.achat;
    this.user = this.authService.payload;
    this.montant = this.achat[4].val;
    this.nomMag = this.achat[12].val;
    this.nom = this.achat[6].val;
    this.ville = this.achat[7].val;

    this.transaService.solde$.subscribe((res) => {
      this.solde = res;
    });
  }

  return() {
    this.router.navigate(['/tabs']);
  }

  get numtel() {
    return this.credentials.get('numtel');
  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: AfficheTransactionComponent,
      cssClass: 'my-custom-class',
      // event: ev,
      componentProps: {
        'motif_return': this.data.motif_return,
        'montantTransaction': this.data.montantTransaction,
      },
      animated: true
    });
    await popover.present();
    const { role } = await popover.onDidDismiss();
  }

  async presentToast(msg, color) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
      color: color
    });
    toast.present();
  }

  //submit payment QR
  async onSubmit() {
    if (this.solde > this.achat[4].val) {
      let obj = {
        "idCompte": this.user.idCompte,
        "idCanalPaiement": 1,
        "idWallet": this.user.idWallet,
        "qr_code_model": {
          "id_00": this.achat[0].val,
          "id_01": this.achat[1].val,
          "id_52": this.achat[2].val,
          "id_53": this.achat[3].val,
          "id_54": this.achat[4].val,
          "id_58": this.achat[5].val,
          "id_59": this.achat[6].val,
          "id_60": this.achat[7].val,
          "id_61": this.achat[8].val,
          "id_2600": this.achat[9].val,
          "id_2601": this.achat[10].val,
          "id_6202": this.credentials.value.numtel,
          "id_6203": this.achat[12].val,
          "id_6205": this.achat[13].val,
          "id_6207": this.achat[14].val,
          "id_6211": this.achat[15].val,
          "id_63": this.achat[16].val
        }
      }
      await this.transactionService.paymentQr(obj);
      this.data = await this.transactionService.trans;
      this.presentPopover();
    } else {
      this.presentToast('Votre solde est insuffisant.', 'danger');
    }
  }


}

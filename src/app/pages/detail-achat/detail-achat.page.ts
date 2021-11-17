import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
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

  constructor(private authService: AuthService,
    private transactionService: TransactionService,
    private location: Location,
    private fbdr: FormBuilder,
    private router: Router,
    public popoverController: PopoverController) { }

  async ngOnInit() {

    this.credentials = this.fbdr.group({
      numtel: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
    });

    this.achat = await this.transactionService.achat;
    this.user = this.authService.payload;
    this.montant = this.achat[4].val;
    this.nomMag = this.achat[12].val;
    this.nom = this.achat[6].val;
    this.ville = this.achat[7].val;
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
      componentProps: this.data,
      translucent: true
    });
    await popover.present();
    const { role } = await popover.onDidDismiss();
  }

  async onSubmit() {
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
        "id_2601": "10112107400001578821",
        "id_2602": this.credentials.value.numtel,
        "id_2603": this.achat[12].val,
        "id_2605": this.achat[13].val,
        "id_2607": this.achat[14].val,
        "id_2611": this.achat[15].val,
        "id_63": this.achat[16].val
      }
    }
    await this.transactionService.paymentQr(obj);
    this.data = await this.transactionService.trans;
    console.log(this.data);
    this.presentPopover();
  }
}

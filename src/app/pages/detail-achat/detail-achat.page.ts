import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { TransactionService } from 'src/app/core/services/transaction.service';

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

  constructor(private transactionService: TransactionService, private location: Location, private fbdr: FormBuilder, private navCtrl: NavController) { }

  ngOnInit() {
    this.credentials = this.fbdr.group({
      numtel: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],

    });
    this.achat = this.transactionService.achat;


    this.montant = this.achat[4].val;
    this.nomMag = this.achat[12].val;
    this.nom = this.achat[6].val;
    this.ville = this.achat[7].val;
  }
  return() {
    this.location.back();
  }


  get numtel() {
    return this.credentials.get('numtel');
  }

  onSubmit() {
    console.log(this.credentials.value);
    let obj = {
      "idCompte": 5,
      "idCanalPaiement": 1,
      "idWallet": 1,
      "qr_code_model": {
        "id_00": "01",
        "id_01": "12",
        "id_52": "3005",
        "id_53": "788",
        "id_54": 4.45,
        "id_58": "TN",
        "id_59": "MAGASIN MANAR I",
        "id_60": "MANAR I",
        "id_61": "2092",
        "id_2600": "tn.atw.atwallet",
        "id_2601": "10112107400001578821",
        "id_2602": "***",
        "id_2603": "AZIZA",
        "id_2605": "21ATWLT1001010000001",
        "id_2607": "64100101",
        "id_2611": "400",
        "id_63": "D082"
      }
    }
    this.transactionService.paymentQr(obj);
  }
}

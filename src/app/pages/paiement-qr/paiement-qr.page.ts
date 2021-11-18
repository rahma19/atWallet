import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  BarcodeScanner,
  BarcodeScannerOptions,
} from '@ionic-native/barcode-scanner/ngx';
import { of } from 'rxjs';
import { TransactionService } from 'src/app/core/services/transaction.service';

@Component({
  selector: 'app-paiement-qr',
  templateUrl: './paiement-qr.page.html',
  styleUrls: ['./paiement-qr.page.scss'],
})
export class PaiementQrPage implements OnInit {

  data: any[] = [];
  j: number = 0;
  id: any;
  l = 0;
  i: number;
  constructor(private barcodeScanner: BarcodeScanner,
    private transactionService: TransactionService,
    private location: Location,
    private router: Router
  ) { }


  decoderQR(qrcode) {
    this.id = qrcode.substr(0, 2);

    while (this.id != '63') {
      if (this.id != '62' && this.id != '26') {
        this.j += 2;
        this.l = Number(qrcode.substr(this.j, 2));
        let val = qrcode.substr(this.j + 2, this.l);
        let x = this.id;
        this.data.push({ id: x, val });
        this.j += this.l;
        this.j += 2;
        this.id = qrcode.substr(this.j, 2);
      }
      else {
        let id = this.id;
        let l = Number(qrcode.substr(this.j + 2, 2));
        this.j = this.j + 2;
        this.i = 0;
        let res = qrcode.substr(this.j + 2, l);
        this.id = id + res.substr(this.i, 2);

        let ln = 0;
        let valres;
        while (this.i < l) {
          this.i = this.i + 2;
          ln = Number(res.substr(this.i, 2));
          valres = res.substr(this.i + 2, ln);
          if (this.id != '')
            this.data.push({ id: this.id, val: valres });
          this.i += ln;
          this.id = id + res.substr(this.i + 2, 2);

          this.i = this.i + 2;

        }
        this.j += this.i;
        this.j = this.j + 2;
        this.id = qrcode.substr(this.j, 2);

      }
    }
    let ln = Number(qrcode.substr(this.j + 2, 2));
    let valres = qrcode.substr(this.j + 4, ln);
    this.data.push({ id: this.id, val: valres });
    console.log(this.data);

  }

  async scanBarcode() {
    let qr = "00020101021252043005530378854042.455802TN5917MAGASIN EZZOUHOUR6009EZZOUHOUR6104999926440016tn.stb.digicarte01201011210740000287881562590203***0305AZIZA052021DCSTB1002010000001070864100201110340063045660";
    this.decoderQR(qr);
    this.transactionService.achat = this.data;
    await this.router.navigateByUrl('/detail-achat');
    // const options: BarcodeScannerOptions = {
    //   preferFrontCamera: false,
    //   showFlipCameraButton: true,
    //   showTorchButton: true,
    //   torchOn: false,
    //   prompt: 'Place a barcode inside the scan area',
    //   resultDisplayDuration: 500,
    //   formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
    //   orientation: 'portrait',
    // };

    // this.barcodeScanner
    //   .scan(options)
    //   .then(async (barcodeData) => {
    //     let qrcode = barcodeData.text;
    //     this.decoderQR(qrcode);
    //     this.transactionService.achat = await this.data;
    //     this.router.navigateByUrl('/detail-achat');
    //   })
    //   .catch((err) => {
    //     console.log('Error', err);
    //   });
  }

  ionViewDidEnter() {
  }

  return() {
    this.location.back();

  }

  ngOnInit() { }
}

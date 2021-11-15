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
  qr = "00020101021252043005530378854042.455802TN5915MAGASIN MANAR I6007MANAR I6104209226430015tn.atw.atwallet01201011210740000157882162590203***0305AZIZA052021ATWLT100101000000107086410010111034006304D082";
  id = this.qr.substr(0, 2);
  l = 0;
  i: number;
  constructor(private barcodeScanner: BarcodeScanner,
    private transactionService: TransactionService,
    private location: Location,
    private router: Router
  ) { }


  decoderQR() {
    this.transactionService.achat = this.data; //qrcode;
    //this.router.navigate(['/achat']);

    //s  while (this.id != '63') {
    if (this.id != '62' && this.id != '26') {
      this.j += 2;
      this.l = Number(this.qr.substr(this.j, 2));
      let val = this.qr.substr(this.j + 2, this.l);
      let x = this.id;
      this.data.push({ id: x, val });
      this.j += this.l;
      this.j += 2;
      this.id = this.qr.substr(this.j, 2);
    }
    else {
      let l = Number(this.qr.substr(this.j + 2, 2));
      this.j = this.j + 2;
      this.i = 0;
      let res = this.qr.substr(this.j + 2, l);
      this.id = res.substr(this.i, 2);

      let ln = 0;
      let valres;
      while (this.i < l) {
        this.i = this.i + 2;
        ln = Number(res.substr(this.i, 2));
        valres = res.substr(this.i + 2, ln);
        if (this.id != '')
          this.data.push({ id: this.id, val: valres });
        this.i += ln;
        console.log(this.i, l);

        this.id = res.substr(this.i + 2, 2);
        console.log(this.id);

        this.i = this.i + 2;

      }
      this.j += this.i;
      //}
      this.j = this.j + 2;
      this.id = this.qr.substr(this.j, 2)
      console.log(this.data);
      console.log(this.id);
    }

  }

  scanBarcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeScanner
      .scan(options)
      .then((barcodeData) => {
        console.log('Barcode data', barcodeData);
        const qrcode = JSON.stringify(barcodeData.text);
        this.decoderQR();
        this.transactionService.achat = this.data; //qrcode;
        this.router.navigate(['/achat']);
        // let j = 0;
        // let id = qrcode.substr(0, 2);
        // while (id != "63") {
        // if (id != "62" && id != "26") {
        //   j += 2;
        //   let l = Number(qrcode.substr(j, 2));
        //   let val = qrcode.substr(j + 2, l);
        //   this.data.push(id, val);
        //   j += l;
        //   id = qrcode.substr(j + 2, 2);
        //   j += 2;
        //   }
        // }

        //  alert(id);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  ionViewDidEnter() {
  }

  return() {
    this.location.back();

  }

  ngOnInit() { }
}

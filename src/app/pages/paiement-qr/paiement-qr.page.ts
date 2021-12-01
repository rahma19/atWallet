import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
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

  //parsing QR code
  decoderQR(qrcode) {
    //get the first id
    this.id = qrcode.substr(0, 2);

    while (this.id != '63') {
      //if simple id
      if (this.id != '62' && this.id != '26') {
        this.j += 2;
        // get length
        this.l = Number(qrcode.substr(this.j, 2));
        // browse the QR code from position j to length
        let val = qrcode.substr(this.j + 2, this.l);
        let x = this.id;
        //push data into table
        this.data.push({ id: x, val });
        //increment j
        this.j += this.l;
        this.j += 2;
        // get the next id
        this.id = qrcode.substr(this.j, 2);
      }
      //if compsed id 
      else {
        //get the current id
        let id = this.id;
        // get length
        let l = Number(qrcode.substr(this.j + 2, 2));
        //increment j
        this.j = this.j + 2;
        this.i = 0;
        //browse the QR code from position j to length, get the new value
        let res = qrcode.substr(this.j + 2, l);
        //get the next id
        this.id = id + res.substr(this.i, 2);
        let ln = 0;
        let valres;

        //browse the QR code from position i to length,
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

        //increment j
        this.j += this.i;
        this.j = this.j + 2;
        //get the next id
        this.id = qrcode.substr(this.j, 2);
      }
    }
    //get the last id data
    let ln = Number(qrcode.substr(this.j + 2, 2));
    let valres = qrcode.substr(this.j + 4, ln);
    this.data.push({ id: this.id, val: valres });
    console.log(this.data);

  }

  //scaning QR code
  async scanBarcode() {
    let qr = "00020101021252043005530378854061000005802TN5912MAGASIN TEST6014VILLE INCONNUE610499990016tn.stb.digicarte011099999999  62440203***052021DCSTB1999010000004070201110340063040ACB";
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
    // //scan QR code
    // this.barcodeScanner
    //   .scan(options)
    //   .then(async (barcodeData) => {
    //     let qrcode = barcodeData.text;
    //     this.decoderQR(qrcode);
    //     // data to achat attribute
    //     this.transactionService.achat = await this.data;
    //     this.router.navigateByUrl('/detail-achat');
    //   })
    //   .catch((err) => {
    //     console.log('Error', err);
    //   });
  }

  // ionViewDidEnter() {
  // }

  return() {
    this.location.back();
  }

  ngOnInit() {

  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-paiement-qr',
  templateUrl: './paiement-qr.page.html',
  styleUrls: ['./paiement-qr.page.scss'],
})
export class PaiementQrPage implements OnInit {
  //camera:any;
  imgURI: string = null;


  ngOnInit() {
  }

}

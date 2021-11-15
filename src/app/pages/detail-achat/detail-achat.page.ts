import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/core/services/transaction.service';

@Component({
  selector: 'app-detail-achat',
  templateUrl: './detail-achat.page.html',
  styleUrls: ['./detail-achat.page.scss'],
})
export class DetailAchatPage implements OnInit {
  achat: any;
  montant = 2.45;
  constructor(private transactionService: TransactionService, private location: Location,) { }

  ngOnInit() {
    this.achat = this.transactionService.achat;
    console.log(this.achat);

  }
  return() {
    this.location.back();

  }
}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from 'src/app/core/services/auth.service';
import { TransactionService } from 'src/app/core/services/transaction.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  user = null;
  transaction: any[] = [];
  datedeb: any;
  datefin: any;
  derniereTransa: any;

  constructor(private location: Location,
    private transService: TransactionService,
    private authService: AuthService) { }

  ngOnInit(): void {
    // var d = new Date();
    // this.datedeb = moment(d).format("YYYY-MM-DD");
    // this.datedeb = '2021-10-25';
    // let datefin = '2021-10-28';
    this.user = this.authService.payload;
    //get all transactions
    this.transService.allTransactions$.subscribe(res => {
      console.log(res);
      for (let i = 0; i < res.length; i++)
        res[i].dateTransaction = moment(res[i].dateTransaction).format('DD/MM/YYYY HH:mm');
      this.transaction = res;
      this.derniereTransa = res[0].dateTransaction;
    });
  }

  return() {
    this.location.back();
  }

}

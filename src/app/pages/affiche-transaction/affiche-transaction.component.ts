import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-affiche-transaction',
  templateUrl: './affiche-transaction.component.html',
  styleUrls: ['./affiche-transaction.component.scss'],
})
export class AfficheTransactionComponent implements OnInit {
  @Input() motif_return: any;
  @Input() montantTransaction: any;

  constructor(private router: Router, private pop: PopoverController) { }

  ngOnInit() {

  }

  close() {
    this.router.navigate(['/tabs']);
    this.pop.dismiss();
  }
}

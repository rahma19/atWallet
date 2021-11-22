import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailAchatPageRoutingModule } from './detail-achat-routing.module';

import { DetailAchatPage } from './detail-achat.page';
import { Currency } from 'src/shared/currency.pipe';
import { PipesModule } from 'src/shared/pipes.module';
import { AfficheTransactionComponent } from '../affiche-transaction/affiche-transaction.component';
import { CurrencyP } from 'src/shared/currencyP.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule, PipesModule,
    DetailAchatPageRoutingModule
  ],
  declarations: [DetailAchatPage, AfficheTransactionComponent],
  providers: [Currency, CurrencyP]
})
export class DetailAchatPageModule { }

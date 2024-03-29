import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechargeTelPageRoutingModule } from './recharge-tel-routing.module';

import { RechargeTelPage } from './recharge-tel.page';
import { AfficheTransactionComponent } from '../affiche-transaction/affiche-transaction.component';
import { Currency } from 'src/shared/currency.pipe';
import { PipesModule } from 'src/shared/pipes.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, BrowserModule,
    ReactiveFormsModule,
    IonicModule, PipesModule,
    RechargeTelPageRoutingModule
  ],
  entryComponents: [AfficheTransactionComponent],
  declarations: [RechargeTelPage],
  providers: [Currency]
})
export class RechargeTelPageModule { }

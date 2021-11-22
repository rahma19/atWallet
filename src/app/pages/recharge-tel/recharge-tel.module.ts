import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechargeTelPageRoutingModule } from './recharge-tel-routing.module';

import { RechargeTelPage } from './recharge-tel.page';
import { AfficheTransactionComponent } from '../affiche-transaction/affiche-transaction.component';
import { Currency } from 'src/shared/currency.pipe';
import { PipesModule } from 'src/shared/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule, PipesModule,
    RechargeTelPageRoutingModule
  ],
  declarations: [RechargeTelPage, AfficheTransactionComponent],
  providers: [Currency]
})
export class RechargeTelPageModule { }

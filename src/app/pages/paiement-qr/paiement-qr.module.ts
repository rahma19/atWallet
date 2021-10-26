import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaiementQrPageRoutingModule } from './paiement-qr-routing.module';

import { PaiementQrPage } from './paiement-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaiementQrPageRoutingModule
  ],
  declarations: [PaiementQrPage],
  providers: []
})
export class PaiementQrPageModule { }

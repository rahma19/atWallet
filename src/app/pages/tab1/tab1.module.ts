import { IonicModule } from '@ionic/angular';
import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { RechargeTelPage } from '../recharge-tel/recharge-tel.page';
import { PaiementQrPage } from '../paiement-qr/paiement-qr.page';
import { Currency } from 'src/shared/currency.pipe';
import { PipesModule } from 'src/shared/pipes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PipesModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page, RechargeTelPage, PaiementQrPage],
  providers: [Currency]
})
export class Tab1PageModule { }

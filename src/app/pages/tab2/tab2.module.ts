import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { Currency } from 'src/shared/currency.pipe';
import { PipesModule } from 'src/shared/pipes.module';
import { CurrencyP } from 'src/shared/currencyP.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule, PipesModule,
    Tab2PageRoutingModule
  ],
  declarations: [Tab2Page],
  providers: [Currency, CurrencyP]
})
export class Tab2PageModule { }

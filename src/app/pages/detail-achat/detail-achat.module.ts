import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailAchatPageRoutingModule } from './detail-achat-routing.module';

import { DetailAchatPage } from './detail-achat.page';
import { Currency } from 'src/shared/currency.pipe';
import { PipesModule } from 'src/shared/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule, PipesModule,
    DetailAchatPageRoutingModule
  ],
  declarations: [DetailAchatPage],
  providers: [Currency]
})
export class DetailAchatPageModule { }

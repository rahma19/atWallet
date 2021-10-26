import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechargeTelPageRoutingModule } from './recharge-tel-routing.module';

import { RechargeTelPage } from './recharge-tel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RechargeTelPageRoutingModule
  ],
  declarations: [RechargeTelPage]
})
export class RechargeTelPageModule {}

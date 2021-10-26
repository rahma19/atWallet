import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaiementQrPage } from './paiement-qr.page';

const routes: Routes = [
  {
    path: '',
    component: PaiementQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaiementQrPageRoutingModule {}

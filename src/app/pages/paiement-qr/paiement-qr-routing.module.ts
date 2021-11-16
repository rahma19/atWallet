import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailAchatPage } from '../detail-achat/detail-achat.page';

import { PaiementQrPage } from './paiement-qr.page';

const routes: Routes = [
  {
    path: '',
    component: PaiementQrPage
  }, {
    path: '/detail-achat',
    loadChildren: () => import('../detail-achat/detail-achat.module').then(m => m.DetailAchatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaiementQrPageRoutingModule { }

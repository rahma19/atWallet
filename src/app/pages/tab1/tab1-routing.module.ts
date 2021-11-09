import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaiementQrPage } from '../paiement-qr/paiement-qr.page';
import { RechargeTelPage } from '../recharge-tel/recharge-tel.page';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  }, {
    path: 'recharge-tel',
    component: RechargeTelPage
    //loadChildren: () => import('../recharge-tel/recharge-tel.module').then(m => m.RechargeTelPageModule)
  },
  {
    path: 'paiement-qr',
    component: PaiementQrPage
    // loadChildren: () => import('../paiement-qr/paiement-qr.module').then(m => m.PaiementQrPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule { }

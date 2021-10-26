import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'recharge-tel',
    loadChildren: () => import('./pages/recharge-tel/recharge-tel.module').then(m => m.RechargeTelPageModule)
  },
  {
    path: 'paiement-qr',
    loadChildren: () => import('./pages/paiement-qr/paiement-qr.module').then(m => m.PaiementQrPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

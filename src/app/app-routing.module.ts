import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { IntroGuard } from './guards/intro.guard';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard]

  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then(m => m.IntroPageModule),
    canLoad: [IntroGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/auth/signup/signup.module').then(m => m.SignupPageModule),
  },
  {
    path: 'recharge-tel',
    loadChildren: () => import('./pages/recharge-tel/recharge-tel.module').then(m => m.RechargeTelPageModule)
  },
  {
    path: 'paiement-qr',
    loadChildren: () => import('./pages/paiement-qr/paiement-qr.module').then(m => m.PaiementQrPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule),
    canLoad: [AutoLoginGuard]
  },
  {
    path: '',
    redirectTo: '/intro',
    pathMatch: 'full'
  },  {
    path: 'modif-profil',
    loadChildren: () => import('./pages/modif-profil/modif-profil.module').then( m => m.ModifProfilPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

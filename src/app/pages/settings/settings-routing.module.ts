import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  }, {
    path: 'modifier-mdp',
    loadChildren: () => import('../modif-profil/modifier-mdp/modifier-mdp.module').then(m => m.ModifierMdpPageModule)
  }, {
    path: 'modif-profil',
    loadChildren: () => import('../modif-profil/modif-profil.module').then(m => m.ModifProfilPageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule { }

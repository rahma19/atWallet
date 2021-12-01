import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifProfilPage } from './modif-profil.page';

const routes: Routes = [
  {
    path: '',
    component: ModifProfilPage
  },  {
    path: 'modifier-mdp',
    loadChildren: () => import('./modifier-mdp/modifier-mdp.module').then( m => m.ModifierMdpPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifProfilPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RechargeTelPage } from './recharge-tel.page';

const routes: Routes = [
  {
    path: '',
    component: RechargeTelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RechargeTelPageRoutingModule { }

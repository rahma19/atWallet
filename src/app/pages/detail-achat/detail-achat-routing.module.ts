import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailAchatPage } from './detail-achat.page';

const routes: Routes = [
  {
    path: '',
    component: DetailAchatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailAchatPageRoutingModule {}

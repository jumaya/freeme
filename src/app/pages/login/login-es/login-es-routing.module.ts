import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginEsPage } from './login-es.page';

const routes: Routes = [
  {
    path: '',
    component: LoginEsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginEsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginEnPage } from './login-en.page';

const routes: Routes = [
  {
    path: '',
    component: LoginEnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginEnPageRoutingModule {}

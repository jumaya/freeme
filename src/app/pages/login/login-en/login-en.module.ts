import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginEnPageRoutingModule } from './login-en-routing.module';

import { LoginEnPage } from './login-en.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginEnPageRoutingModule,
    ComponentesModule
  ],
  declarations: [LoginEnPage]
})
export class LoginEnPageModule {}

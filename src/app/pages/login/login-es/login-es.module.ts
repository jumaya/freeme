import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginEsPageRoutingModule } from './login-es-routing.module';

import { LoginEsPage } from './login-es.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginEsPageRoutingModule,
    ComponentesModule
  ],
  declarations: [LoginEsPage]
})
export class LoginEsPageModule {}

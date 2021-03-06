import { TranslateModule } from '@ngx-translate/core';
import { ComponentesModule } from './../../componentes/componentes.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CuentaPageRoutingModule } from './cuenta-routing.module';
import { CuentaPage } from './cuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentaPageRoutingModule,
    ComponentesModule,
    TranslateModule
  ],  
  declarations: [CuentaPage]
})
export class CuentaPageModule {}

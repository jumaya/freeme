import { TranslateModule } from '@ngx-translate/core';
import { ComponentesModule } from './../../componentes/componentes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentaPageRoutingModule } from './venta-routing.module';

import { VentaPage } from './venta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentaPageRoutingModule,
    ComponentesModule,
    TranslateModule
  ],
  declarations: [VentaPage]
})
export class VentaPageModule {}

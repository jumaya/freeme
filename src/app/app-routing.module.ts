import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login/es', pathMatch: 'full' },  
  { path: 'login/es', loadChildren: () => import('./pages/login/login-es/login-es.module').then( m => m.LoginEsPageModule)},  
  { path: 'login/en', loadChildren: () => import('./pages/login/login-en/login-en.module').then( m => m.LoginEnPageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

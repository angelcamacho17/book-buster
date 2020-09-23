import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { FeLoginGuard, FeAuthGuard } from '@fecommerce-workspace/data-store-lib';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    data: { animation: 'login' },
    canActivate: [FeLoginGuard]
  },
  {
    path: 'main',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
    data: { animation: 'main' },
    canActivate: [FeAuthGuard]
  },
  { path: '**', redirectTo: 'main' }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


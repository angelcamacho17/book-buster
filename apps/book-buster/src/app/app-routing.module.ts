import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { MainGuard } from './guards/main.guard';
import { NotSupportedGuard } from './guards/not-supported.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    data: { animation: 'login' },
    canActivate: [LoginGuard]
  },
  {
    path: 'main',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
    data: { animation: 'main' },
    canActivate: [MainGuard]
  },
  {
    path: 'not-supported',
    loadChildren: () => import('./modules/not-supported/not-supported.module').then(m => m.NotSupportedModule),
    data: { animation: 'not-supported' },
    canActivate: [NotSupportedGuard]
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


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainComponent,
        children: [
          {
            path: 'home',
            loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
            data: { animation: 'home' },
            //canActivate: [FeLoginGuard]
          },
          {
            path: 'order',
            loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
            data: { animation: 'order' },
            //canActivate: [FeLoginGuard]
          },
          { path: '**', redirectTo: 'home' }
        ]
      },

  ]),
  SharedModule
]})
export class MainModule { }

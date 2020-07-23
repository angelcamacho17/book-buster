import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { MainRoutingModule } from './main-routing.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';



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

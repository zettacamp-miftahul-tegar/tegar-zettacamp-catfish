import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { AppComponent } from '../app.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { AboutComponent } from '../about/about.component';
import { MaterialModule } from '../material/material.module';
import { MenuModule } from '../menu/menu.module';
import { AboutModule } from '../about/about.module';
import { HomepagesComponent } from './homepages/homepages.component';
import { StockManagementComponent } from '../stock-management/stock-management.component';
import { MenuManagementComponent } from '../menu-management/menu-management.component';
import { CartComponent } from '../cart/cart.component';
import { GuardGuard } from '../login/auth/guard.guard'
import { HistoryComponent } from '../history/history.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { GuardPermissionGuard } from '../login/auth/guard-permission.guard';
import { SpecialOfferComponent } from './special-offer/special-offer.component';
import { MenuHeightlightComponent } from './menu-heightlight/menu-heightlight.component';

const routes : Routes = [
  {
    path:'', component:HomepageComponent,
    children:[
      {
        path:"homepage", component:HomepagesComponent
      },
      {
        path:"menu", component:MenuComponent
      },
      {
        path:"about", component:AboutComponent
      },
      {
        path:"stock-management", component: StockManagementComponent, canActivate:[GuardGuard, GuardPermissionGuard]
      },
      {
        path:"menu-management", component: MenuManagementComponent, canActivate:[GuardGuard, GuardPermissionGuard]
      },
      {
        path:"cart-management", component: CartComponent, canActivate:[GuardGuard]
      },
      {
        path:"history", component: HistoryComponent, canActivate:[GuardGuard]
      },
      {
        path:"**", redirectTo:"homepage"
      }
    ]
  }
]

@NgModule({
  declarations: [
    HomepageComponent,
    HomepagesComponent,
    SpecialOfferComponent,
    MenuHeightlightComponent,
    MenuHeightlightComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    AboutModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [
    HomepageComponent,
    SpecialOfferComponent,
    MenuHeightlightComponent
  ]
})
export class HomepageModule { }

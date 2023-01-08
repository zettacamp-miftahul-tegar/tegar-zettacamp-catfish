import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

const routes : Routes = [
  {
    path:'', component:SideNavComponent,
    children:[
      // {
      //   path:'',
      //   redirectTo:'/homepage',
      //   pathMatch:'full'
      // },
      {
        path:"homepage", component:HomepageComponent
      },
      {
        path:"profile", component:ProfileComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    HomepageComponent,
    ProfileComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [
    ProfileComponent,
    HomepageComponent,
    SideNavComponent
  ]
})
export class GlobalMenuModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {
    path:'', component:SideBarComponent,
    children:[
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
    SideBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    SideBarComponent,
    ProfileComponent,
    HomepageComponent
  ]
})
export class GlobalMenuModule { }

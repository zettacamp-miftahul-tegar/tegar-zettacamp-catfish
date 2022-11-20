import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { MaterialModule } from '../material/material.module';
import { CartBuyComponent } from './cart-buy/cart-buy.component';
import { UpdateComponent } from './update/update.component';



@NgModule({
  declarations: [
    CartComponent,
    CartBuyComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    CartComponent,
    UpdateComponent
  ]
})
export class CartModule { }

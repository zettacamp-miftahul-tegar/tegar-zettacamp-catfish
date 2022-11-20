import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private subs = new SubSink();
  carts: any[] = []

  constructor(private data: CartService) {}

  ngOnInit(): void {
    this.getDatas()
  }

  getDatas() {
    this.subs.sink = this.data.getCart().valueChanges.subscribe((resp: any) => {
      this.carts = resp.data.getAllCart.cart
    })
    this.getIngredient_id()
  }

  getIngredient_id() {
    this.data.getCart().valueChanges.subscribe((item: any) => {
      this.carts = item.data.getAllCart.cart

      let tempIngredId: { recipe_name: any; price: any; imgUrl: any } [] = [];

      this.carts.forEach((ingre: { recipe_id: { id: any; };recipe_name: any;price: any;imgUrl: any; }) => {
        tempIngredId.push({
          recipe_name: ingre.recipe_name,
          price: ingre.price,
          imgUrl: ingre.imgUrl
        });
      });

      let tempMenu = {
        ...this.carts,
        recipe_id: tempIngredId
      };

      return tempMenu;
    });
  }
}

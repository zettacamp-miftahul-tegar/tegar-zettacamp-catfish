import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private subs = new SubSink();
  carts: any[]=[]
  cartz: any[]=[]
  total_price: any;
  cart_length: any;
  datas:any

  constructor(private data: CartService) {}

  ngOnInit(): void {
    this.getCard_id(this.datas)
  }

  getCard_id(event:any) {
    this.subs.sink = this.data.getCart().valueChanges.subscribe((item: any) => {
      this.carts = item.data.getAllCart.cart
      this.total_price = item.data.getAllCart.total_price
      this.cart_length = item.data.getAllCart.cart_length
    });
  }

  // refetchData() {
  //   this.data.getCart().refetch();
  // }

  deleteAllCart() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.data.deleteAllCart()
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        // this.getCard_id(this.datas)
        // this.getCard_id(this.datas)
        window.location.reload()
      }
    })
  }

  buyCart() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Items that have been purchased cannot be returned !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, buy now!'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.data.addBuyPrice()
        Swal.fire(
          'Success !',
          'your order is being processed',
          'success'
        )
        this.getCard_id(this.datas)
        window.location.reload()
      }
    })
  }
}
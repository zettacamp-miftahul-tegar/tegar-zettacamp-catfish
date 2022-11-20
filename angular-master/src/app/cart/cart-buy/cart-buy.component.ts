import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CartService } from '../service/cart.service';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-cart-buy',
  templateUrl: './cart-buy.component.html',
  styleUrls: ['./cart-buy.component.css']
})
export class CartBuyComponent implements OnInit {

  @Input() cart: any;

  constructor(
    public dialog: MatDialog,
    private data : CartService
  ) { }

  ngOnInit(): void {
  }

  refetchData() {
    this.data.getCart().refetch();
  }

  deleteCart(parameter: any) {
    console.log(parameter);
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
        this.data.deleteOneCart(parameter)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.refetchData()
      }
    })
  }

  deleteAllCart() {
    this.data.deleteAllCart()
  }

  openUpdate(parameter:any): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '100%',
      data: parameter
      // disableClose: true,
      // hasBackdrop: true,      
    });    

    // console.log(parameter.recipe_id.id);
    

    dialogRef.afterClosed().subscribe(result => {
      // if (result) {
      //   this.getDatas() 
      // }
    });
  }

}

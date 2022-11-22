import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() getAllCart: any;
  @Output() refetchall! : EventEmitter<any>;

  constructor(
    public dialog: MatDialog,
    private data : CartService,
  ) {
    this.refetchall = new EventEmitter();
   }

  ngOnInit(): void {
  }

  // refetchData() {
  //   this.data.getCart().refetch();
  // }

  deleteCart(parameter: any) {
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
        this.data.deleteOneCart(parameter.id)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        // this.refetchData()
        this.refetchall.emit()
      }
    })
  }

  openUpdate(parameter:any): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '30%',
      data: parameter,
      disableClose: true,
      hasBackdrop: true,      
    });    

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refetchall.emit(result)
      }
    });
  }

  // ------------------------------------------------------------

  minesAmounts(parameter:any) {
    setTimeout(() => {
      this.data.minusAmount(parameter)
    }, 1000)
    this.refetchall.emit()
    // this.refetchData() 
  }

  plesAmounts(parameter:any) {
    setTimeout(() => {
      this.data.plesAmounts(parameter)
    }, 1000)
    this.refetchall.emit()
    // this.refetchData() 
  }
}

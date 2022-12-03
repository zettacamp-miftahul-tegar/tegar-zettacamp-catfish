import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
  datas:any;
  datas1:any;
  balancee:any;

  @Output() refetchNotif : EventEmitter<any>;

  constructor(
    private data: CartService,
    private router: Router,
    private translateService : TranslateService,
  ) {
    this.refetchNotif = new EventEmitter();
  }

  ngOnInit(): void {
    this.getCard_id(this.carts)
    this.getBalance()
  }

  getBalance() {

    let user_id = JSON.parse(localStorage.getItem('user_id') !);

    const idz = {
      getOneUserId : user_id
    }

    this.subs.sink = this.data.getBALANCE(idz).valueChanges.subscribe((item:any) => {
      this.balancee = item.data.getOneUser.balance
    })
  }
  

  getCard_id(event:any) {
    this.subs.sink = this.data.getCart().valueChanges.subscribe((item: any) => {
      this.carts = item?.data?.getAllCart?.cart
      this.total_price = item?.data?.getAllCart?.total_price
      this.cart_length = item?.data?.getAllCart?.cart_length
    });
  }

  // getCard_Length(event:any) {
  //   this.subs.sink = this.data.getCart().valueChanges.subscribe((item: any) => {
  //     this.cart_length = item?.data?.getAllCart?.cart_length
  //   });
  // }


  refetchData() {
    this.data.getCart().refetch();
  }

  routing() {
    this.router.navigate(['menu'])
  }

  deleteAllCart() {
    Swal.fire({
      title: this.translateService.instant('cartz.failC'),
      text: this.translateService.instant('cartz.fail2C'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translateService.instant('cartz.fail3C')
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.data.deleteAllCart()
        Swal.fire(
          this.translateService.instant('cartz.fail4C'),
          this.translateService.instant('cartz.fail5C'),
          'success'
        ).then((res) => {
          // this.refetchNotif.emit(true)
          // this.getCard_id(this.cart_length)
          // this.refetchData()
          // this.getCard_Length(this.datas1)
          this.carts = []
          this.cart_length = 0
        })
      }
    })
  }

  buyCart() {
      Swal.fire({
        title: this.translateService.instant('cartz.confirm2'),
        text: this.translateService.instant('cartz.confirm1'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.translateService.instant('cartz.confirm'),
      }).then((result:any) => {
        if (result.isConfirmed) {
          this.data.addBuyPrice().subscribe(subs => { 
            Swal.fire(
              this.translateService.instant('cartz.bravo'),
              this.translateService.instant('cartz.bravo1'),
              'success'
            ).then((res) => {
              this.router.navigate(['history'])
              this.data.addBuyPrice()
              this.carts = []
              this.cart_length = 0
            })
          },err =>
            Swal.fire({
              icon: 'error',
              title: this.translateService.instant('cartz.fail'),
              text: this.translateService.instant('cartz.fail2'),
            })
          )
        }
      })
      
  }
}
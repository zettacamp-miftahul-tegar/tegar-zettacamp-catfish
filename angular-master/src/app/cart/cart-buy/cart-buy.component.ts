import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { SubSink } from 'subsink';
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
  private subs = new SubSink();
  dataz:any
  datazz:any[]=[]

  constructor(
    public dialog: MatDialog,
    private data : CartService,
    private translateService : TranslateService,
  ) {
    this.refetchall = new EventEmitter();
   }

  ngOnInit(paginationObj?: any): void {

    const pagination: any = {
      page: paginationObj?.page,
      limit: paginationObj?.limit,
    }

    this.subs.sink = this.data.getRecipies(pagination).valueChanges.subscribe((item:any) => {
      this.dataz = item?.data?.getAllRecipe.recipes
    })
  }

  deleteCart(parameter: any) {
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
        this.data.deleteOneCart(parameter.id)
        Swal.fire(
          this.translateService.instant('cartz.fail4C'),
          this.translateService.instant('cartz.fail5C'),
          'success'
        )
        this.refetchall.emit(true)
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
        this.refetchall.emit(true)
      }
    });
  }

  // ------------------------------------------------------------

  minesAmounts(parameter:any) {
    this.data.minusAmount(parameter).subscribe((item) => {
      this.refetchall.emit(true)
    })
  }

  plesAmounts(parameter:any) {
    this.data.plesAmounts(parameter).subscribe((item) => {
      this.refetchall.emit(true)
    })
  }
}

import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SubSink } from 'subsink';
import { CartService } from './cart/service/cart.service';
import { LoginComponent } from './login/login.component';
import Swal from 'sweetalert2';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-master';
  email: any;
  private subs = new SubSink();
  cart_length:any

  token : string | null = "";
  user_type: string | null = "";
  first_name: any;
  last_name: any;

  currentLanguage = 'en';
  srcImages: string = 'https://cdn-icons-png.flaticon.com/512/323/323329.png';

  constructor(
    private router: Router,
    private translateService : TranslateService,
    public dialog: MatDialog, 
    private cart: CartService, 
    private translate : TranslateService ) { 
      translate.addLangs(['en', 'fr']);
      translate.setDefaultLang('en');
  }

  changeLanguage(lang: any) {
    if (lang === 'en') {
      this.translate.use('fr');
      this.currentLanguage = 'fr';
      this.srcImages =
        '../assets/img/icons8-france-48.png';
    } else {
      this.translate.use('en');
      this.currentLanguage = 'en';
      this.srcImages = 'https://cdn-icons-png.flaticon.com/512/323/323329.png';
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token')
      this.user_type = JSON.parse(localStorage.getItem('user_type')!)
    }
    this.first_name = JSON.parse(localStorage.getItem('first_name') !);
    this.last_name = JSON.parse(localStorage.getItem('last_name') !);
    this.getCard_id(true)
  }

  data:any
  a:any

  getCard_id(event:any) {
    this.subs.sink = this.cart.getCart()?.valueChanges.subscribe((item: any) => {
      this.cart_length = item?.data?.getAllCart?.cart_length
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '100%',
      panelClass: 'bg-color',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.router.navigate(['homepage'])
    }});
  }

  openRegister(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '100%',
      panelClass: 'bg-color',
      data: this.cart_length
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.router.navigate(['homepage'])
    }});
  }

  cartRedirect() {
    this.router.navigate(['cart-management'])
  }

  history() {
    this.router.navigate(['history'])
  }

  logOut() {
    Swal.fire({
      title: this.translateService.instant('title'),
      text: this.translateService.instant('text'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: this.translateService.instant('cancel'),
      confirmButtonText: this.translateService.instant('confirm')
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: this.translateService.instant('title1'),
        }).then((result) => {
          localStorage.removeItem('first_name');
          localStorage.removeItem('last_name');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('user_type');
            this.router.navigate(['homepage']).then(()=>{
              window.location.reload()
            }
          )
        })
      }
    })
  }
  
}

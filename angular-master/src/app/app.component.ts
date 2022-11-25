import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { CartService } from './cart/service/cart.service';
import { LoginComponent } from './login/login.component';
import { DataService } from './stock-management/service/data.service'

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

  constructor(
    private router: Router,
    public dialog: MatDialog, 
    private cart: CartService, 
    private translateService : TranslateService ) { 
  }

  selectedLang = 'en';

  setLanguage(lang: string) {
    this.translateService.use(lang);
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

  getCard_id(event:any) {
    this.subs.sink = this.cart.getCart().valueChanges.subscribe((item: any) => {
      this.cart_length = item?.data?.getAllCart?.cart_length
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '100%',
      panelClass: 'bg-color',
      data: this.cart_length
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.email = result;
    });
  }

  logOut() {
    Swal.fire({
      title: 'Are you sure?',
      text: "are you sure to exit?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, exit now'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'success !',
          'you made it out',
          'success'
        ).then((result) => {
          localStorage.removeItem('token');
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

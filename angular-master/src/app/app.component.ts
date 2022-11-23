import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SubSink } from 'subsink';
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

  token : string | null = ""
  user_type: string | null = "";

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
    this.getCard_id(this.data)
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
      localStorage.removeItem('token');
      localStorage.removeItem('user_type');
      this.router.navigate(['homepage']).then(()=>{
        window.location.reload()
    })
  }
  
}

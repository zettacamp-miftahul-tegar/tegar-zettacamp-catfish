import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
  menus! : boolean | null
  // isLoggedIn$!: Observable<boolean>;

  constructor(private router: Router, public dialog: MatDialog, private authService : DataService ) { 
    this.router.navigate(['homepage'])
  }

  ngOnInit(): void {
    let data = localStorage.getItem('token') ? true : false
    this.menus = data
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '100%',
      panelClass: 'bg-color',
      data: this.menus
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.email = result;
    });
  }

  logOut() {
    localStorage.removeItem(environment.tokenKey);
  }
  
}

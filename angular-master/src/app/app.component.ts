import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-master';
  email: any;

  constructor(private router: Router, public dialog: MatDialog) { 
    this.router.navigate(['homepage'])
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '100%',
      panelClass: 'bg-color',
      data: {
        email: this.email
      },
      // disableClose: true,
      // hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.email = result;
    });
  }

  logOut() {
    localStorage.removeItem(environment.tokenKey);
  }
  
}

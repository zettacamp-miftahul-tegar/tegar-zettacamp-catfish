import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/login/login.component';
import { RegisterComponent } from 'src/app/register/register.component';
import Swal from 'sweetalert2';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-menu-heightlight',
  templateUrl: './menu-heightlight.component.html',
  styleUrls: ['./menu-heightlight.component.css']
})
export class MenuHeightlightComponent implements OnInit {

  @Input() recipe: any;
  token!: string | null;
  user_type!: string | null;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token')
      this.user_type = JSON.parse(localStorage.getItem('user_type')!)
    }
  }

  openDialog(parameter: any): void {
    const dialogRef = this.dialog.open(InputComponent, {
      width: '30%',
      data: parameter,
      disableClose: true,
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    })
  }

  openLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '100%',
      panelClass: 'bg-color',
    });

    dialogRef.afterClosed().subscribe((result: any) => {})
  }

  openRegister(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '100%',
      panelClass: 'bg-color',
    });

    dialogRef.afterClosed().subscribe((result: any) => {})
  }

  open() {
    Swal.fire({
      text: 'already have an account?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Login',
      cancelButtonText: "Back",
      denyButtonText: `Register`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.openLogin()
      } else if (result.isDenied) {
        this.openRegister()
      }
    })
  }

}

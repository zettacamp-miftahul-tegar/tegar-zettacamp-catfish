import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { Logins } from '../model/userLogin.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dataSource: MatTableDataSource <Logins> = new MatTableDataSource();
  signupForm!: FormGroup;
  private subs = new SubSink();
  public loginInvalid = false;
  public formSubmitAttempt = false;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Logins,
    private router: Router,
    private authService: AuthService,
    // private datas : DataService,d
  ) { }

  ngOnInit(): void {
    this.initForm();
    // this.isLoadingg = trued
  }

  initForm() {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
    // this.getDatas()
  }

  login() {
    if (this.signupForm.valid) {
      const payload: Logins = this.signupForm.value;
      this.subs.sink = this.authService.loginUser(payload.email, payload.password).subscribe((resp: any) => {
        // console.log(resp);
        if (resp) {
          this.router.navigate(['menu']);
          this.dialogRef.close();
        }
      })
    } else if (this.signupForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'User not found !',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'password error !',
      });
    }
  }

  // login() {
  //   if (this.signupForm.valid) {
  //     const payload: Logins = this.signupForm.value;
  //     this.subs.sink = this.authService.loginUser(payload.email, payload.password).subscribe(async (resp: any) => {
  //       // console.log(resp);
  //       if (resp) {
  //         try {
  //           const username = this.signupForm.get('username')?.value;
  //           const password = this.signupForm.get('password')?.value;
  //           await this.authService.loginUser(username, password);
  //           this.router.navigate(['menu']);
  //           this.dialogRef.close();
  //         } catch (err) {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'User not found !',
  //           });
  //         }
  //       } else {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'password not found !',
  //         });
  //       }
  //     })
  //   }
  // }
}

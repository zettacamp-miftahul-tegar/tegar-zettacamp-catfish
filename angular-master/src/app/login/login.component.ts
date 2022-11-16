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

  signupForm!: FormGroup;
  private subs = new SubSink();

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Logins,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subs.sink?.unsubscribe()
  }

  initForm() {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
  }

  login() {
    if (this.signupForm.valid) {
      const payload: Logins = this.signupForm.value;
      this.subs.sink = this.authService.loginUser(payload.email, payload.password).subscribe((resp: any) => {

        // let userData = resp.data.user;
        // console.log(userData);
        // let userToken = resp.data.Login.token;
        // localStorage.setItem('userToken', userToken);
        // localStorage.setItem('userData', JSON.stringify(userData));

        if (resp) {
          this.router.navigate(['menu']);
          this.dialogRef.close();
        }
      })
    } else {
      if (!this.signupForm.get('email')) {
        Swal.fire({
          icon: 'error',
          title: 'Email is incorrect !',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'User not found ! !',
        });
      }  
    }
  }
}

// login() {
//   const payload: Logins = this.signupForm.value;
//   this.subs.sink = this.authService.loginUser(payload.email, payload.password).subscribe((resp: any) => {
//     if (this.signupForm.valid) {
//       // const payload: Logins = this.signupForm.value;
//       // this.subs.sink = this.authService.loginUser(payload.email, payload.password).subscribe((resp: any) => {
//         // console.log(resp);
//         if (resp) {
//           this.router.navigate(['menu']);
//           this.dialogRef.close();
//         }
//     } else {
//       if (!resp.payload.email) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Email incorrect !',
//         });
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'password incorrect !',
//         });
//       }
//     }
// })

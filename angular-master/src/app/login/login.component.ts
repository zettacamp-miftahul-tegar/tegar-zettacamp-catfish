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

  auth:boolean = false;
  token : any;
  hide = true;

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

  getErrorMessageEmail() {
    if (this.signupForm.get('email')?.hasError('required')) {
      return 'This email is required!';
    }
    return this.signupForm.get('email')?.hasError('email') ? 'This email is fail' : '';
  }

  login() {
    const payload: Logins = this.signupForm.value;
    this.subs.sink = this.authService.loginUser(payload.email, payload.password).subscribe(resp => {
      if (resp) {
        Swal.fire({
          icon: 'success',
          title: 'Login Succesful',
        })
        this.router.navigate(['homepage']).then(()=>{
          // setTimeout(() => {
          //   window.location.reload()
          // }, 1000)
          this.dialogRef.close()
        }).then((result) => {
          window.location.reload()
        })
      }
    }, err => {
      Swal.fire({
        icon: 'error',
        title: err.message,
      })}
    )
  }

}
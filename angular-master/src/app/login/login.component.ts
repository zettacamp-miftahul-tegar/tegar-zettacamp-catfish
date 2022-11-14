import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
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

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Logins,
    private router: Router,
    private authService: AuthService,
    // private datas : DataService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    // this.isLoadingg = true
  }

  initForm() {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
    // this.getDatas()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  login() {
    const payload: Logins = this.signupForm.value;
    this.subs.sink = this.authService.loginUser(payload.email, payload.password).subscribe((resp: any) => {
      console.log(resp);
      if (resp) {
        this.router.navigate(['menu']);
      }
    })
  }

}

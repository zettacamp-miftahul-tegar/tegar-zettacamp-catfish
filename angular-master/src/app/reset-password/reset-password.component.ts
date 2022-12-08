import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { LoginComponent } from '../login/login.component';
import { ForgotService } from './service/forgot.service';
import { ValidationPetComponent } from './validation-pet/validation-pet.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  hide = true;
  hidee = true;
  signupForm!: FormGroup;
  private subs = new SubSink();

  ngOnInit(): void {
    this.initForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef < ResetPasswordComponent > ,
    private router: Router,
    private data:ForgotService,
    private translateService : TranslateService,
    public dialog: MatDialog, 
  ) {}

  // ngOnDestroy(): void {
  //   this.subs.sink?.unsubscribe()
  // }

  initForm() {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  getErrorMessageEmail() {
    if (this.signupForm.get('email')?.hasError('required')) {
      return this.translateService.instant('email1');
    }
    return this.signupForm.get('email')?.hasError('email') ? this.translateService.instant('email2') : '';
  }

  openVALIDATION(payload?:any): void {
    this.dialogRef.close()
    const dialogRef = this.dialog.open(ValidationPetComponent, {
      width: '100%',
      panelClass: 'bg-color',
      data : payload
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.router.navigate(['homepage'])
    }});
  }

  resetNow() {
    const payload: any = this.signupForm.value;
    this.subs.sink = this.data.resetPassword(payload).valueChanges.subscribe(resp => {
      if (resp) {
        this.dialogRef.close()
        Swal.fire({
          icon: 'success',
          title: this.translateService.instant('active'),
        }).then(() => {
          this.openVALIDATION(payload)
        })
      }
    }, err => {
      Swal.fire({
        icon: 'error',
        title: this.translateService.instant('deactive'),
      })}
    )
  }

  onBack() {
    this.openDialog()
  }

  openDialog(): void {
    this.dialogRef.close()
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '100%',
      panelClass: 'bg-color',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.router.navigate(['homepage'])
    }});
  }
}

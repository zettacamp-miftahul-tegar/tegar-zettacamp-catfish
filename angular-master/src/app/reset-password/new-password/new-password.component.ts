import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { ForgotService } from '../service/forgot.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  hide = true;
  hidee = true;
  signupForm!: FormGroup;
  private subs = new SubSink();

  ngOnInit(): void {
    this.initForm();
  }

  constructor(
    public dialogRef: MatDialogRef < NewPasswordComponent > ,
    private router: Router,
    private data:ForgotService,
    private translateService : TranslateService,
    public dialog: MatDialog, 
    @Inject(MAT_DIALOG_DATA) public datas: any,
  ) {}

  // ngOnDestroy(): void {
  //   this.subs.sink?.unsubscribe()
  // }

  initForm() {
    this.signupForm = new FormGroup({
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  a:any;
  b:any;
  c:any;

  resetNow() {

    const email = {
      email : this.datas.email.email,
    }

    const friendName = {
      friend_name : this.datas.payloadz.friend_name,
    }

    const petName = {
      pet_name : this.datas.payloadz.pet_name
    }
  
    this.a = email
    this.b = friendName
    this.c = petName

    const payload: any = this.signupForm.value;
    this.subs.sink = this.data.validation(this.a, this.b, this.c, payload).subscribe(resp => {
      if (resp) {
        Swal.fire({
          icon: 'success',
          title: this.translateService.instant('change.success'),
        })
        this.router.navigate(['homepage']).then(()=>{
          this.dialogRef.close()
        })
      }
    }, err => {
      Swal.fire({
        icon: 'error',
        title: this.translateService.instant('change.fail'),
      })}
    )
  }

}


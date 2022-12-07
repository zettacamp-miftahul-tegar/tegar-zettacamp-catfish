import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { NewPasswordComponent } from '../new-password/new-password.component';
import { ResetPasswordComponent } from '../reset-password.component';
import { ForgotService } from '../service/forgot.service';

@Component({
  selector: 'app-validation-pet',
  templateUrl: './validation-pet.component.html',
  styleUrls: ['./validation-pet.component.css']
})
export class ValidationPetComponent implements OnInit {

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
      'friend_name': new FormControl(null, [Validators.required]),
      'pet_name': new FormControl(null, [Validators.required]),
    });
  }

  openPASSWORD(em?: any, payloadz?:any): void {
    this.dialogRef.close()
    const dialogRef = this.dialog.open(NewPasswordComponent, {
      width: '100%',
      panelClass: 'bg-color',
      data : {email : this.datas, payloadz}
    });
    
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.datas()
    }});
  }

 resetNow() {
    const payload: any = this.signupForm.value;
    this.subs.sink = this.data.resetPassword1(this.datas, payload).valueChanges.subscribe(resp => {
      if (resp) {
        Swal.fire({
          icon: 'success',
          title: this.translateService.instant('validation.success'),
        })
        this.openPASSWORD(this.datas, payload)
      }
    }, err => {
      Swal.fire({
        icon: 'error',
        title: this.translateService.instant('validation.fail'),
      })}
    )
  }

}

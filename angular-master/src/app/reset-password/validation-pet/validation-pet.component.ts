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

  ngOnDestroy(): void {
    this.subs.sink?.unsubscribe()
  }

  initForm() {
    this.signupForm = new FormGroup({
      'friend_name': new FormControl(null, [Validators.required]),
      'pet_name': new FormControl(null, [Validators.required]),
      // 'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
  }

  getErrorMessageEmail() {
    if (this.signupForm.get('email')?.hasError('required')) {
      return 'This email is required!';
    }
    return this.signupForm.get('email')?.hasError('email') ? 'This email is fail' : '';
  }

  // openPASSWORD(): void {
  //   const dialogRef = this.dialog.open(NewPasswordComponent, {
  //     width: '100%',
  //     panelClass: 'bg-color',
  //     // data: this.cart_length
  //   });

  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     if (result) {
  //       this.router.navigate(['homepage'])
  //   }});
  // }

 resetNow() {
    console.log(this.datas);
  
    const payload: any = this.signupForm.value;
    this.subs.sink = this.data.validation(this.datas, payload).subscribe(resp => {
      if (resp) {
        Swal.fire({
          icon: 'success',
          title: this.translateService.instant('reset.success'),
        })
        this.router.navigate(['homepage']).then(()=>{
          this.dialogRef.close()
        })
      }
    }, err => {
      Swal.fire({
        icon: 'error',
        title: this.translateService.instant('reset.fail'),
      })}
    )
  }

}

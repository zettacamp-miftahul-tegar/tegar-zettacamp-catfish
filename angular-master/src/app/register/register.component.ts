import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { RegisterService } from './service/register.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
    public dialogRef: MatDialogRef < RegisterComponent > ,
    private router: Router,
    private data:RegisterService,
    private translateService : TranslateService,
    public dialog: MatDialog, 
  ) {}

  ngOnDestroy(): void {
    this.subs.sink?.unsubscribe()
  }

  initForm() {
    this.signupForm = new FormGroup({
      'first_name': new FormControl(null, [Validators.required]),
      'last_name': new FormControl(null, [Validators.required]),
      'friend_name': new FormControl(null, [Validators.required]),
      'pet_name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
  }

  getErrorMessageEmail() {
    if (this.signupForm.get('email')?.hasError('required')) {
      return this.translateService.instant('email1');
    }
    return this.signupForm.get('email')?.hasError('email') ? this.translateService.instant('email2') : '';
  }

  openDialog(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '100%',
      panelClass: 'bg-color',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log("close");
      
      if (result) {
        this.router.navigate(['homepage'])
    }});
  }

  register() {
    const payload: any = this.signupForm.value;
    this.subs.sink = this.data.registerUser(payload).subscribe(resp => {
      if (resp) {
        Swal.fire({
          icon: 'success',
          title: this.translateService.instant('passRegister'),
        })
        this.router.navigate(['homepage']).then(()=>{
          this.dialogRef.close()
        })
      }
    }, err => {
      Swal.fire({
        icon: 'error',
        title: this.translateService.instant(`${err.message}`)
      })}
    )
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Users } from '../model/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../users.service'
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common'
import { TranslateService } from '@ngx-translate/core';

interface Genders {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  bebas: any;
  signupForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    console.log(this.data);
    
  }

  selectedLang = 'en';

  setLanguage(lang: string) {
    this.translateService.use(lang);
  }

  initForm() {
    this.signupForm = new FormGroup({
      'civility': new FormControl(null, [Validators.required]),
      'first_name': new FormControl(null, [Validators.required]),
      'last_name': new FormControl(null, [Validators.required]),
      'date': new FormControl(null, [Validators.required]),
      'gender': new FormControl(null, [Validators.required]),
    });
  }


  genders: Genders[] = [
    {value: 'male', viewValue: 'male'},
    {value: 'female', viewValue: 'female'},
  ];

  constructor(
    public dialogRef: MatDialogRef<InputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Users,
    private datas : UsersService,
    private datepipe : DatePipe,
    public translateService: TranslateService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.signupForm.value.date = this.datepipe.transform(this.signupForm.value.date)
      this.datas.addUser(this.signupForm.value)
      console.log('berhasil');
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your work has been saved',
      });
      this.dialogRef.close({
        name : "tegar"
      })
    } else {
      console.log('gagal');
      Swal.fire({
        icon: 'error',
        title: this.translateService.instant('fail-title'),
        text: this.translateService.instant("fail-text"),
      });
      this.signupForm.markAllAsTouched();
    }
  }
}

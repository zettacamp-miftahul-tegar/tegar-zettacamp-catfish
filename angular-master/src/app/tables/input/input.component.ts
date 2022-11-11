import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { Datas } from '../../model/card.model'
import Swal from 'sweetalert2'
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  todos: Datas[] = [];
  dataSource: MatTableDataSource <Datas> = new MatTableDataSource();

  isLoadingg : boolean = false;

  bebas: any;
  signupForm!: FormGroup;
  error: any;

  pagination: any = {
    page: 0,
    limit: 13
  }

  constructor(
    public dialogRef: MatDialogRef<InputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Datas,
    private datas : DataService,
    private translateService : TranslateService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signupForm = new FormGroup({
      'ref': new FormControl(null, [Validators.required]),
      'title': new FormControl(null, [Validators.required]),
      'sub_title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value)
      this.datas.addPromo(this.signupForm.value)
      .subscribe(({data}: any) => {
        this.todos = data.onSubmit;
        Swal.fire({
          icon: 'success',
          title: this.translateService.instant('succes-title'),
          text: this.translateService.instant("succes-text"),
        }).then((bebas) => {
          this.dialogRef.close({
            dialog : "succes"
          })
          this.datas.getPromos(this.pagination).refetch()
        });
      });
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
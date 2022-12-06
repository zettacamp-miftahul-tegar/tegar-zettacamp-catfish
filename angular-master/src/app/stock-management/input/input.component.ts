import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import {Stocks} from '../../model/stock.model'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  signupForm!: FormGroup;
  todos: Stocks[] = [];

  constructor(
    private data: DataService,
    public dialogRef: MatDialogRef<InputComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: Stocks,
    private translateService : TranslateService,
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'stock': new FormControl(null, [Validators.required]),
    });
    this.signupForm.patchValue(this.signupForm.value)
    // console.log(this.signupForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  pagination: any = {
    page: 0,
    limit: 10
  }
  search:any;
  statusF:any

  onSubmit() {
    if (this.signupForm.valid) {
      this.data.addStock(this.signupForm.value)
      .subscribe(({dash}: any) => {
        this.todos = dash        
        Swal.fire({
          icon: 'success',
          title: this.translateService.instant('stockT.bravo'),
          text: this.translateService.instant('stockT.bravo1'),
        }).then((bebas: any) => {
          this.dialogRef.close(true)
          this.data.getStock(this.pagination, this.search, this.statusF).refetch()
        });
      },
      err => 
      Swal.fire({
        icon: 'error',
        title: this.translateService.instant('stockT.fail'),
        text: this.translateService.instant('stockT.fail1'),
      })
    );
  } else {
      console.log('gagal');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong !',
      });
      this.signupForm.markAllAsTouched();
    }
  }  


}

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { sources } from '../model/drop.model';
import { DropdownOption } from '../model/dropdown.model';
import { DataService } from '../service/data.service';
import {Stocks} from '../../model/stock.model'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  signupForm!: FormGroup;
  todos: Stocks[] = [];

  // availableSources: DropdownOption[] = sources;

  constructor(
    private router: Router, 
    private data: DataService,
    public dialogRef: MatDialogRef<InputComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: Stocks,
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.signupForm = new FormGroup({
      'id': new FormControl(null, [Validators.required]),
      'name': new FormControl(null, [Validators.required]),
      'stock': new FormControl(null, [Validators.required]),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.data.addStock(this.signupForm.value)
      .subscribe(({dash}: any) => {
        this.todos = dash        
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your work has been saved',
        }).then((bebas: any) => {
          this.dialogRef.close({
            name : "tegar"
          })
          this.data.getStock().refetch()
        });
      }
      );
      console.log('berhasil');
     
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

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Stocks } from 'src/app/model/stock.model';
import { DataService } from '../service/data.service';
import Swal from 'sweetalert2'
import { DropdownOption } from '../model/dropdown.model';
import { sources } from '../model/drop.model';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  signupForm!: FormGroup;
  todos: Stocks[] = [];
  availableSources: DropdownOption[] = sources;

  constructor(
    private data: DataService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: Stocks,
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.signupForm.patchValue(this.datas)    
  }

  initForm() {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'stock': new FormControl(null, [Validators.required]),
      'status': new FormControl(null, [Validators.required]),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  pagination: any
  name:any

  onSubmit() {
    if (this.signupForm.valid) {
      const ingre = {
        id : this.datas.id,
        ...this.signupForm.value
      }
      // console.log(ingre);
      
      this.data.updateStock(ingre)
      .subscribe(({dash}: any) => {
        this.todos = dash        
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your work has been saved',
        }).then((bebas: any) => {
          this.dialogRef.close({
            status : "berhasil"
          })
          this.data.getStock(this.pagination).refetch()
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

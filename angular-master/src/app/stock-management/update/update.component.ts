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
  submitClicked: any;

  constructor(
    private router: Router, 
    private data: DataService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: Stocks,
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.signupForm = new FormGroup({
      // 'id': new FormControl(''),
      'stock': new FormControl(null, [Validators.required]),
      'status': new FormControl(null, [Validators.required]),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.data.updateStock(this.signupForm.value)
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

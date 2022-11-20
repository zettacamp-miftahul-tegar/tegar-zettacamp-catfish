import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  signupForm!: FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public datas: any,
    public dialogRef: MatDialogRef<UpdateComponent>,
    private data: CartService
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.signupForm.patchValue(this.datas)    
  }

  initForm() {
    this.signupForm = new FormGroup({
      amount: new FormControl(null, Validators.required),
      note: new FormControl(''),
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.signupForm.valid) {

      const ingre = {
        item_id : this.datas.id,
        ...this.signupForm.value
      }

      this.data.updateStock(ingre)
      .subscribe(({dash}: any) => {
        this.datas = dash        
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your work has been saved',
        }).then((bebas: any) => {
          this.dialogRef.close({
            status : "berhasil"
          })
          this.data.getCart().refetch()
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
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from 'src/app/cart/service/cart.service';
import Swal from 'sweetalert2';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  signupForm!: FormGroup;
  todos: any;

  constructor(
    public dialogRef: MatDialogRef<InputComponent>,
    private data: RecipeService,
    @Inject(MAT_DIALOG_DATA) public datas: any,
    private data1 : CartService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.signupForm = new FormGroup({
      amount: new FormControl(null, Validators.required),
      note: new FormControl(''),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  refetchData() {
    this.data1.getCart().refetch();
  }

  onSubmit() {
    if (this.signupForm.valid) {

      const bebas = {
        recipe_id: this.datas.id,
        ...this.signupForm.value
      }

      this.data.addCart(bebas)
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
        },
        err => 
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'name already to used !',
        })
        );
      }
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

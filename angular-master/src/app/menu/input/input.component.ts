import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from 'src/app/cart/service/cart.service';
import { SubSink } from 'subsink';
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
  recepien: any

  constructor(
    public dialogRef: MatDialogRef < InputComponent > ,
    private data: RecipeService,
    @Inject(MAT_DIALOG_DATA) public datas: any,
    private data1: CartService,
    private translateService : TranslateService,
  ) {}

  ngOnInit(): void {
    this.getDatas()
    this.initForm()
  }

  getDatas() {
    const bebas = {
      available: this.datas.available
    }
    this.recepien = bebas.available
    this.initForm()
  }

  initForm() {
    this.signupForm = new FormGroup({
      amount: new FormControl(null, [Validators.required, Validators.max(this.recepien), Validators.min(1)]),
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
        .subscribe(({ dash }: any) => {
          this.todos = dash
          Swal.fire({
            icon: 'success',
            title: this.translateService.instant('menusT.bravo1'),
            text: this.translateService.instant('menusT.bravo'),
          }).then((bebas: any) => {
              this.dialogRef.close({
                status: "berhasil"
              })
              this.refetchData()
            }
          );
        }, err => 
        Swal.fire({
          icon: 'error',
          title: this.translateService.instant('menusT.fail1'),
          text: this.translateService.instant('menusT.fail'),
        })
      )
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

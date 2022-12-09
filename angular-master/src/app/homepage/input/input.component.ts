import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../service/data.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { CartService } from '../../cart/service/cart.service'

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
    private data: DataService,
    private cart: CartService,
    @Inject(MAT_DIALOG_DATA) public datas: any,
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.getDatas()
    this.getDatas_special()
  }

  private subs = new SubSink();
  menus:any

  getDatas_special() {
    this.subs.sink = this.data.getRecipies_special().valueChanges.subscribe((resp : any) => {
      this.menus = resp?.data?.getAllRecipe?.recipes
      console.log(this.menus);
    })
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
    this.cart.getCart().refetch();
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
            title: 'Success',
            text: 'Successfully added to cart!',
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
          title: 'Oops...',
          text: 'Menu is already in cart !',
        })
      )
    }
  }
}

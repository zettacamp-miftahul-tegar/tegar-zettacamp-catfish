import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Menus } from 'src/app/model/menu.model';
import { DataService } from '../service/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  signupForm!: FormGroup;
  id: any;
  todos: Menus[] = [];
  ingredient:any;
  paginations:any;


  constructor(
    private data: DataService, 
    public dialogRef: MatDialogRef<InputComponent>, 
  ) {}

  ngOnInit(): void {
    this.initForm()
    this.data.getStock(this.paginations).valueChanges.subscribe(( dass: any) => {
      this.ingredient = dass.data.getAllIngredient.ingredients
    })
  }

  get addr() {
    return this.signupForm.controls['ingredients'] as FormArray;
  }

  initForm() {
    this.signupForm = new FormGroup({
      imgUrl: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      recipeName: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      price: new FormControl(null, [Validators.required, Validators.min(1)]),
      ingredients: new FormArray([])
    });
  }

  onIngredients() {
    this.addr.push(new FormGroup({  
      ingredient_id: new FormControl(null, Validators.required),
      stock_used: new FormControl(null, [Validators.required, Validators.min(1)]),
    }));
  }

  get controls(): FormArray {
    return this.signupForm.get('ingredients') as FormArray;
  }

  removeIngredients(i: number) {
    this.controls.removeAt(i);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  pagination: any = {
    page: 0,
    limit: 10
  }

  onSubmit(){
    if (this.signupForm.valid) {
      this.signupForm.value.ingredients.map((data:any)=>{
        data.stock_used = parseInt(data.stock_used)
      })
      this.data.addRecipe(this.signupForm.value)
      .subscribe(({data}: any) => {
        this.todos = data
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Menu added successfully!',
        }).then((bebas) => {
          this.dialogRef.close(true)
        });
      });
    } else {
      console.log('gagal');
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'failed to upload data !',
      });
      this.signupForm.markAllAsTouched();
    }
  }
}
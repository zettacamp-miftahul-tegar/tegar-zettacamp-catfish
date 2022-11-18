import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Menus } from 'src/app/model/menu.model';
import Swal from 'sweetalert2';
import { DataService } from '../service/data.service';

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
    private route: ActivatedRoute, 
    private data: DataService, 
    public dialogRef: MatDialogRef<InputComponent>, 
  ) {}

  ngOnInit(): void {
    this.initForm()

    this.data.getStock(this.paginations).valueChanges.subscribe(( dass: any) => {
      this.ingredient = dass.data.getAllIngredient.ingredients

      console.log(dass.data.getAllIngredient.ingredients.id);
      
    })
  }

  get addr() {
    return this.signupForm.controls['ingredients'] as FormArray;
  }

  initForm() {
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
    } else {
      this.id == null;
    }

    this.signupForm = new FormGroup({
      imgUrl: new FormControl(null, Validators.required),
      recipeName: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      ingredients: new FormArray([])
    });
  }

  onIngredients() {
    this.addr.push(new FormGroup({
      ingredient_id: new FormControl(null, Validators.required),
      stock_used: new FormControl(null, Validators.required),
    }));
  }

  get controls(): FormArray {
    return this.signupForm.get('ingredients') as FormArray;
  }

  removeIngredients(i: number) {
    this.controls.removeAt(i);
  }

  pagination: any = {
    page: 0,
    limit: 10
  }

  onSubmit(){
    let stock = (this.signupForm.value.ingredients)
    console.log(stock);
    

    this.signupForm.value.ingredients.map((data:any)=>{
      data.stock_used = parseInt(data.stock_used)
    })
    
    this.data.addRecipe(this.signupForm.value).subscribe((dash:any) => {
      this.todos = dash
    })    

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Your work has been saved',
    })

    this.dialogRef.close(true)
  }
}
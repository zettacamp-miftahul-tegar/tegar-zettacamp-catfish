import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Menus } from 'src/app/model/menu.model';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  signupForm!: FormGroup;
  ids:any;
  todos: Menus[] = [];
  ingredient:any;
  
  paginations:any;
  testing : any;
  dataMenu: any;
  
  // const subcription = new FormGroup({
  //   ingredient_id: new FormControl(this.datas.id.ingredients[i].ingredient_id.name, Validators.required),
  //   stock_used: new FormControl(this.datas.id.ingredients[i].stock_used, Validators.required),
  // });

  // (<FormArray>this.signupForm.get('ingredients')).push(subcription)

  constructor(
    private route: ActivatedRoute, 
    private data: DataService, 
    public dialogRef: MatDialogRef<UpdateComponent>, 
    @Inject(MAT_DIALOG_DATA) public datas: any,
  ) {}

  subcription: any;

  ngOnInit(): void {
    this.initForm()    
    
    this.ingredient = this.data
      .datalength(this.datas.id.id).subscribe((item: any) => {

        this.dataMenu = item.data.getOneRecipes;

        for (let i = 0; i < item.data.getOneRecipe.totalLength; i++) {
          this.onIngredients()
        }
        let tempIngredId: { ingredient_id: any; stock_used: any; }[] = [];

          this.signupForm.ingredients.forEach((ingre: { ingredient_id: { id: any; }; stock_used: any; }) => {
            // console.log(ingre);
            tempIngredId.push({
              ingredient_id: ingre.ingredient_id.id, 
              stock_used: ingre.stock_used
            });
          });

          let tempMenu = {
            ...this.dataMenu,
            ingredients : tempIngredId
          };

          // console.log(tempMenu);
          this.signupForm.patchValue(tempMenu);
        });
      
      this.data.getStock(this.paginations).valueChanges.subscribe(( dass: any) => {
        this.ingredient = dass.data.getAllIngredient.ingredients      
        this.signupForm.patchValue(dass.data.getAllIngredient.ingredients);
    })    

    this.signupForm.patchValue(this.datas.id);

  }

  get addr() {
    return this.signupForm.controls['ingredients'] as FormArray;
  }

  initForm() {
    this.signupForm = new FormGroup({
      imgUrl: new FormControl(null, Validators.required),
      recipe_name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      ingredients: new FormArray([])
    });
  }

  onIngredients() {
    console.log(this.datas.getOneRecipe);
    
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
    const ingre = {
      id : this.datas.id,
      ...this.signupForm.value
    }

    // console.log(ingre);
    

    let stock = (this.signupForm.value.ingredients)    

    this.signupForm.value.ingredients.map((data:any)=>{
      data.stock_used = parseInt(data.stock_used)
    })
    
    this.data.updateRecipe(ingre).subscribe((dash:any) => {
      this.todos = dash
    })    

    this.dialogRef.close(true)
  }

}

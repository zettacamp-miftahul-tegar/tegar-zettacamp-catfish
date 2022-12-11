import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { Menus } from 'src/app/model/menu.model';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  signupForm:any
  ids: any;
  todos: Menus[] = [];
  ingredient: any;

  paginations: any;
  testing: any;
  dataMenu: any;
  ingredientDUP:any;

  constructor(
    private data: DataService,
    public dialogRef: MatDialogRef < UpdateComponent > ,
    @Inject(MAT_DIALOG_DATA) public datas: any,
    private fb: FormBuilder,
    private translateService : TranslateService,
  ) {}

  subcription: any;

  ngOnInit(): void {
    this.getDatas()
    this.initForm()
  }

  getDatas() {
    this.data.getStock(this.paginations).valueChanges.subscribe((dass: any) => {
      this.ingredient = dass.data.getAllIngredient.ingredients
      // this.signupForm.patchValue(dass.data.getAllIngredient.ingredients);
    })
  }

  initForm() {
    this.signupForm = new FormGroup({
      imgUrl: this.fb.control("", [Validators.required, Validators.minLength(5)]),
      recipe_name: this.fb.control("", [Validators.required, Validators.minLength(4)]),
      price: this.fb.control("", [Validators.required, Validators.min(1000)]),
      discount: this.fb.control("", [Validators.min(0), Validators.max(80)]),
      ingredients: this.fb.array([])
    });
    this.signupForm.get('ingredients').valueChanges.subscribe((item:any) => {
        this.ingredientDUP = item.map((val:any)=>{
          return val.ingredient_id
        })
      }
    )
    this.byDataLength();
  }

  byDataLength() {
    this.data.datalength(this.datas.id).subscribe((item: any) => {
      this.dataMenu = item.data.getOneRecipe

      for (let i = 0; i < item.data.getOneRecipe.totalLength; i++) {
        this.addNewIngredients()
      }

      let tempIngredId: { ingredient_id: any; stock_used: any; } [] = [];

      this.dataMenu.ingredients.forEach((ingre: { ingredient_id: { id: any; };stock_used: any; }) => {
        tempIngredId.push({
          ingredient_id: ingre.ingredient_id.id,
          stock_used: ingre.stock_used
        });
      });

      let tempMenu = {
        ...this.dataMenu,
        ingredients: tempIngredId
      };
      this.signupForm.patchValue(tempMenu);
    });
    this.signupForm.patchValue(this.datas);
  }

  get controls(): FormArray {
    return this.signupForm.get('ingredients') as FormArray;
  }

  // get addr() {
  //   return this.signupForm.controls['ingredients'] as FormArray;
  // }

  onIngredients() {
    return new FormGroup({
      ingredient_id: this.fb.control("", Validators.required),
      stock_used: this.fb.control("", [Validators.required, Validators.min(1)]),
    });
  }

  addNewIngredients() {
    this.controls.push(this.onIngredients());
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

  onSubmit() {
    if (this.signupForm.valid) {

      const bebas = {
        id: this.datas.id,
        ...this.signupForm.value
      }
      
      this.data.updateRecipe(bebas).subscribe(({data}: any) => {
        this.todos = data
          Swal.fire({
            title: this.translateService.instant('menuT.bravo'),
            text: this.translateService.instant('menuT.bravo2'),
            icon: "success",
            confirmButtonText: "Ok"
          }).then(() => {
            this.dialogRef.close(true);
          });
        },
        err => {
          Swal.fire({
            icon: "error",
            title: this.translateService.instant('menuT.fail'),
            text: this.translateService.instant(`${err.message}`),
            confirmButtonText: "OK"
          });
        }
      );
    } 
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  signupForm!: FormGroup;
  av:any

  constructor(
    @Inject(MAT_DIALOG_DATA) public datas: any,
    public dialogRef: MatDialogRef<UpdateComponent>,
    private data: CartService,
    private translateService : TranslateService,
  ) { }

  ngOnInit(): void {
    const bebas = {
      available: this.datas.recipe_id.available
    }
    this.av = bebas.available
    this.initForm()
    this.signupForm.patchValue(this.datas)   
  }

  initForm() {
    this.signupForm = new FormGroup({
      amount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(this.av)]),
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
          title: this.translateService.instant('cartz.bravo'),
          text: this.translateService.instant('cartz.bravo2'),
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
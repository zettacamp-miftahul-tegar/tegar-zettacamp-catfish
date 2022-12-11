import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Stocks } from 'src/app/model/stock.model';
import { DataService } from '../service/data.service';
import Swal from 'sweetalert2'
import { DropdownOption } from '../model/dropdown.model';
import { sources } from '../model/drop.model';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  signupForm!: FormGroup;
  todos: Stocks[] = [];
  availableSources: DropdownOption[] = sources;

  constructor(
    private data: DataService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
    private translateService : TranslateService,
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.signupForm.patchValue(this.datas)  
  }

  initForm() {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'stock': new FormControl(null, [Validators.required, Validators.min(1)]),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  pagination: any
  search: any;

  onSubmit() {
    if (this.signupForm.valid) {
      const ingre = {
        id : this.datas.id,
        ...this.signupForm.value
      }
      
      this.data.updateStock(ingre).subscribe(({dash}: any) => {
        this.todos = dash        
        Swal.fire({
          icon: 'success',
          title: this.translateService.instant('stockT.bravo'),
          text: this.translateService.instant('stockT.bravo2'),
        }).then((bebas: any) => {
          this.dialogRef.close(true)
          this.data.getStock(this.pagination, this.search).refetch()
        });
      }, err => 
      Swal.fire({
        icon: 'error',
        title: this.translateService.instant('stockT.fail'),
        text: this.translateService.instant(`${err.message}`),
      })
    );
  }} 
}

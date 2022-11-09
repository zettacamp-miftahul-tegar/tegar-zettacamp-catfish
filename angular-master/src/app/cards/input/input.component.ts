import { Component, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { Datas } from '../../model/card.model'
import Swal from 'sweetalert2'
import { MatTableDataSource } from '@angular/material/table';
import { SubSink } from 'subsink';
import { debounceTime } from 'rxjs';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  todos: Datas[] = [];
  dataSource: MatTableDataSource <Datas> = new MatTableDataSource();
  // private subs = new SubSink();

  isLoadingg : boolean = false;

  bebas: any;
  signupForm!: FormGroup;
  error: any;

  constructor(
    public dialogRef: MatDialogRef<InputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Datas,
    private datas : DataService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    // this.isLoadingg = true
  }

  initForm() {
    this.signupForm = new FormGroup({
      'ref': new FormControl(null, [Validators.required]),
      'title': new FormControl(null, [Validators.required]),
      'sub_title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
    });
    // this.getDatas()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.isLoadingg = true;
    if (this.signupForm.valid) {
      this.datas.addPromo(this.signupForm.value)
      .subscribe(({data}: any) => {
        this.isLoadingg = false;
        this.todos = data.onSubmit;
        this.signupForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your work has been saved',
        }).then((bebas) => {
          this.dialogRef.close({
            name : "tegar"
          })
          this.datas.getCards().refetch()
        });
      }
      );
      console.log('berhasil');
     
      this.isLoadingg = false;
      
    } else {
      this.isLoadingg = false;
      console.log('gagal');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong !',
      });
      this.signupForm.markAllAsTouched();
    }
    // this.getDatas()
  }  

}

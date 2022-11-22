import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-menu-recipe',
  templateUrl: './menu-recipe.component.html',
  styleUrls: ['./menu-recipe.component.css']
})
export class MenuRecipeComponent implements OnInit {

  @Input() recipe: any;
  token : string | null = ""
  user_type: string | null = "";
  
  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token')
      this.user_type = JSON.parse(localStorage.getItem('user_type')!)
    }
  }

  openDialog(parameter: any): void {
    const dialogRef = this.dialog.open(InputComponent, {
      width: '30%',
      data: parameter,
      disableClose: true,
      hasBackdrop: true
    });

    // console.log(parameter.id);
    

    dialogRef.afterClosed().subscribe((result: any) => {
      // if (result) {
      //   this.getDatas() 
      // }
      
    })
  }

}

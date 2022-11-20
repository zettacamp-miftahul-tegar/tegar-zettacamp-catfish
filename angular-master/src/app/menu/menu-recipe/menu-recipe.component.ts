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
  
  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

  openDialog(parameter: any): void {
    const dialogRef = this.dialog.open(InputComponent, {
      width: '100%',
      data: parameter,
      // disableClose: true,
      // hasBackdrop: true
    });

    console.log(parameter.id);
    

    dialogRef.afterClosed().subscribe((result: any) => {
      // if (result) {
      //   this.getDatas() 
      // }
      
    })
  }

}

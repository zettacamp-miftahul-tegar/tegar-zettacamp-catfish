import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, Output} from '@angular/core';
import { SubSink } from 'subsink';
import { DataService } from '../data.service'
import { Datas } from '../model/card.model';
import { MatTableDataSource } from '@angular/material/table';
import { InputComponent } from './input/input.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QueryRef } from 'apollo-angular';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  public isLoadingg : boolean = false;

  private subs = new SubSink();

  Datas:Datas[]=[]
  ref: any;

  constructor(private data : DataService, public dialog: MatDialog, private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getDatas();
  }

  // ngOnDestroy(): void {
  //   this.isLoadingg = true
  // }

  postsQuery!: QueryRef<{ posts: Datas[] }>;

  getDatas() {
    this.isLoadingg = true
    this.subs.sink = this.data.getCards().valueChanges.subscribe((resp : any) => {
      this.Datas.push(resp.data.GetAllPromos)
      this.dataSource = new MatTableDataSource(resp.data.GetAllPromos)
      // console.log(resp.data.GetAllPromos);
    })
  }

  displayedColumns: string[] = ['ref', 'title', 'subs', 'des'];

  dataSource: MatTableDataSource <Datas> = new MatTableDataSource();

  selection = new SelectionModel<Datas>(true, [])

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InputComponent, {
      width: '100%',
      data: {name: this.ref},
      disableClose: true,
      hasBackdrop: true
    });

    // this.isLoadingg = true

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.ref = result;
      // this.isLoadingg = true

      // console.log(result);
      
    });
  }
}
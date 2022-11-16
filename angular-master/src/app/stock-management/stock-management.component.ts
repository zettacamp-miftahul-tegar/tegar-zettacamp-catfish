import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SubSink } from 'subsink';
import { Stocks } from '../model/stock.model';
import { InputComponent } from './input/input.component';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-stock-management',
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.css']
})
export class StockManagementComponent implements OnInit {

  private subs = new SubSink();
  Datas:Stocks[]=[]
  name: any;

  constructor(
    private data: DataService, 
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDatas()
    this.refetchData()
  }

  getDatas() {
    this.subs.sink = this.data.getStock().valueChanges.subscribe((resp : any) => {
      this.dataSource = new MatTableDataSource(resp);
      this.Datas.push(resp.data.getAllIngredient.ingredients)
      this.dataSource = new MatTableDataSource(resp.data.getAllIngredient.ingredients)
      // console.log(resp.data.getAllIngredient.ingredients);
    })
  }

  displayedColumns: string[] = ['name', 'stock', 'status', 'action'];

  dataSource: MatTableDataSource <Stocks> = new MatTableDataSource();

  selection = new SelectionModel<Stocks>(true, [])

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
      data: {name: this.name},
      disableClose: true,
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
    });
  }

  refetchData() {
    // const pagination = this.pagination;
    this.data.getStock().refetch();
  }

  onDelete(parameter:any){
    this.data.deleteStock(parameter) 
    console.log(typeof parameter);
  };

}

import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { Stocks } from '../model/stock.model';
import { InputComponent } from './input/input.component';
import { DataService } from './service/data.service';
import { UpdateComponent } from './update/update.component';

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

  // --------------------------------------------

  openUpdate(parameter:any): void {
    const id = parameter
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '100%',
      data: {id: parameter},
      disableClose: true,
      hasBackdrop: true,      
    });

    console.log(id);

    // localStorage.setItem("ingredient_id", id)

    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
    });
  }

  // ------------------------------------------------

  onDelete(parameter:any){
    console.log(typeof parameter);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result:any) => {
      if (result.isConfirmed) {
      this.data.deleteStock(parameter) 
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.refetchData()
      }
    })
  };

  // if () {
  //   this.data.deleteStock(parameter)
  //   console.log(typeof parameter);
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result:any) => {
  //     if (result.isConfirmed) {
  //       Swal.fire(
  //         'Deleted!',
  //         'Your file has been deleted.',
  //         'success'
  //       )
  //       this.refetchData()
  //     }
  //   })
  // } else {
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Oops...',
  //     text: 'Something went wrong!',
  //     footer: '<a href="">Why do I have this issue?</a>'
  //   })
  // }

}

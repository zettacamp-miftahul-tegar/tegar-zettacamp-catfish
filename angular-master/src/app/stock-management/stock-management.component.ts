import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SubSink } from 'subsink';
import { Stocks } from '../model/stock.model';
import { InputComponent } from './input/input.component';
import { DataService } from './service/data.service';
import { UpdateComponent } from './update/update.component';
import Swal from 'sweetalert2';

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
      this.searchFilter()
      this.getDatas()
      // this.refetchData()
    }
    
    displayedColumns: string[] = ['name', 'stock', 'status', 'action'];
    dataSource: MatTableDataSource <Stocks> = new MatTableDataSource();
    selection = new SelectionModel<Stocks>(true, [])
    
    getDatas(paginationObj?: any) {

    const pagination: any = {
      page: paginationObj?.page ?? 0,
      limit: paginationObj?.limit ?? 10
    }
    
    this.subs.sink = this.data.getStock(pagination, this.search).valueChanges.subscribe((resp : any) => {
      if(resp?.data?.getAllIngredient){
        this.paginator.length = resp.data.getAllIngredient.totalDocs;      
        this.paginator.pageSize = this.pageSizeOptions[0];
        this.dataSource.data = resp.data.getAllIngredient.ingredients
      } else {
        this.paginator.length = 0;
        this.dataSource.data = [];
      }

    },
    (err) => {
      this.paginator.length = 0;
      this.dataSource.data = [];
    })

  }

  @ViewChild('paginator') paginator!: MatPaginator;

  pageSizeOptions: number[] = [10];

  onPaginatorChange(event: PageEvent) {
    const pagination = {
      limit: event.pageSize,
      page: event.pageIndex+1,
    }
    this.getDatas(pagination)
  }

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
      width: '30%',
      data: {name: this.name},
      disableClose: true,
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDatas()
      }
    });
  }

  pagination: any = {
    page: 0,
    limit: 10
  }

  // refetchData() {
  //   const pagination = this.pagination;
  //   this.data.getStock(this.pagination, this.search).refetch();
  // }

  // --------------------------------------------

  openUpdate(parameter:any): void {
    const id = parameter
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '30%',
      data: parameter,
      disableClose: true,
      hasBackdrop: true,      
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDatas() 
      }
    });
  }

  // ------------------------------------------------

  onDelete(parameter:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "stock will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete now!'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.data.deleteStock(parameter)
        Swal.fire(
          'Deleted!',
          'Your stock has been deleted.',
          'success'
        )
        // this.refetchData()
        this.getDatas()
      }
    })
  };

  // ------------------------------------------------------

  value = '';
  nameFilter = new FormControl();
  page = 1;
  search : any;
  maxPage : any;
  dataIngredients : any;

  searchFilter(paginationObj?:any) {
    this.nameFilter.valueChanges.subscribe((val) => {
      this.search = val
      this.getDatas()
    });
  }

}
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
    
    displayedColumns: string[] = ['name', 'stock', 'status', 'action'];
  
    dataSource: MatTableDataSource <Stocks> = new MatTableDataSource();
  
    selection = new SelectionModel<Stocks>(true, [])
    
    getDatas(paginationObj?: any) {

    const pagination: any = {
      page: paginationObj?.page ?? 0,
      limit: paginationObj?.limit ?? 10
    }
    
    // const name: string = paginationObj.name

    this.subs.sink = this.data.getStock(pagination).valueChanges.subscribe((resp : any) => {

      this.paginator.length = resp.data.getAllIngredient.totalDocs;      
      this.paginator.pageSize = this.pageSizeOptions[0];

      // console.log(resp.data);

      this.dataSource = new MatTableDataSource(resp);
      this.Datas.push(resp.data.getAllIngredient.ingredients)
      this.dataSource = new MatTableDataSource(resp.data.getAllIngredient.ingredients)

      this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
        this.filteredValues['name'] = nameFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      });
      this.dataSource.filterPredicate = this.customFilterPredicate();
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
      width: '100%',
      data: {name: this.name},
      disableClose: true,
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
    });
  }

  pagination: any = {
    page: 0,
    limit: 10
  }

  refetchData() {
    const pagination = this.pagination;
    this.data.getStock(this.pagination).refetch();
  }

  // --------------------------------------------

  openUpdate(parameter:any): void {
    const id = parameter
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '100%',
      // data: {id : parameter},
      data: parameter,
      disableClose: true,
      hasBackdrop: true,      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // ------------------------------------------------

  onDelete(parameter:any){
    // console.log(typeof parameter);
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

  // ------------------------------------------------------

  nameFilter = new FormControl();
  value = '';
  filteredValues: any = {
    name: '',
  };

  customFilterPredicate() {
    const myFilterPredicate = function (data: Stocks, filter: string): boolean {

      const array = Object.entries(data);
      const objFromArray = Object.fromEntries(array);

      let searchString = JSON.parse(filter);
      // console.log(data);
      
      let nameFound =
        data.name
        .toString()
        .trim()
        .toLowerCase()
        .includes((searchString.name || '').toLowerCase())

      return nameFound;
    };
    return myFilterPredicate;
  }


}
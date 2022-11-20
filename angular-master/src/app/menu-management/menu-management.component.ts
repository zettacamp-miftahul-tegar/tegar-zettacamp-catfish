import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { Menus } from '../model/menu.model';
import { InputComponent } from './input/input.component';
import { DataService } from './service/data.service';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-menu-management',
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.css']
})
export class MenuManagementComponent implements OnInit {

  private subs = new SubSink();
  Menue: Menus[] = []
  recipe_name: any;

  constructor(
    private data: DataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getDatas()
    this.refetchData()
  }

  displayedColumns: string[] = ['recipe_name', 'ingredients', 'price', 'available', 'status', 'action'];

  dataSource: MatTableDataSource <Menus> = new MatTableDataSource();

  selection = new SelectionModel <Menus> (true, [])

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

  @ViewChild('paginator') paginator!: MatPaginator;

  pageSizeOptions: number[] = [10];

  onPaginatorChange(event: PageEvent) {
    const pagination = {
      limit: event.pageSize,
      page: event.pageIndex+1,
    }
    this.getDatas(pagination)
  }


  getDatas(paginationObj?: any) {

    const pagination: any = {
      page: paginationObj?.page ?? 0,
      limit: paginationObj?.limit ?? 10
    }

    this.subs.sink = this.data.getRecipe(pagination).valueChanges.subscribe((resp: any) => {

      this.paginator.length = resp.data.getAllRecipes.totalDocs;      
      this.paginator.pageSize = this.pageSizeOptions[0];

      this.dataSource = new MatTableDataSource(resp);
      this.Menue.push(resp.data.getAllRecipes.recipes)
      this.dataSource = new MatTableDataSource(resp.data.getAllRecipes.recipes)

      // console.log(resp.data.getAllRecipe.recipes);
      
    })
  }

  pagination: any = {
    page: 0,
    limit: 10
  }

  refetchData() {
    const pagination = this.pagination;
    this.data.getRecipe(this.pagination).refetch();
  }

  // --------------------------------------------------

  openDialog(): void {
    const dialogRef = this.dialog.open(InputComponent, {
      width: '100%',
      data: {name: this.recipe_name},
      // disableClose: true,
      // hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getDatas() 
      }
      
    })
  }

  // ------------------------------------------------

  onDelete(parameter:any){
    // console.log(parameter);
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
        this.data.deleteRecepies(parameter)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.refetchData()
      }
    })
  };

  // -----------------------------------------------------

  openUpdate(parameter:any): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '100%',
      data: parameter
      // disableClose: true,
      // hasBackdrop: true,      
    });    

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDatas() 
      }
    });
  }

}

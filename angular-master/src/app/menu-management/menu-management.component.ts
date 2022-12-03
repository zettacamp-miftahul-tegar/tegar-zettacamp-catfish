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
import copy from 'fast-copy';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DetailComponent } from './detail/detail.component';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-menu-management',
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.css']
})
export class MenuManagementComponent implements OnInit {

  foods: Food[] = [
    {value: '', viewValue: 'All'},
    {value: 'publish', viewValue: 'Publish'},
    {value: 'unpublish', viewValue: 'Unpublish'},
  ];

  private subs = new SubSink();
  Menue: Menus[] = []
  recipe_name: any;

  constructor(
    private data: DataService,
    public dialog: MatDialog,
    private translateService : TranslateService,
  ) {}

  ngOnInit(): void {
    this.getDatas()
    this.statusFilterr()
  }

  displayedColumns: string[] = ['recipe_name', 'detail', 'price', 'available', 'special-h', 'menu-h','status', 'action'];

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

  getDatas(paginationObj?: any) {

    const pagination: any = {
      page: paginationObj?.page ?? 0,
      limit: paginationObj?.limit ?? 10,
    }

    this.subs.sink = this.data.getRecipe(pagination, this.search, this.statusF).subscribe((resp: any) => {
      if(resp?.data?.getAllRecipes){
        this.paginator.length = resp.data.getAllRecipes.totalDocs;  
        this.pagination = resp.data.getAllRecipes.currentDocs
        // this.pageSizeOptions = resp.data.getAllRecipes.currentDocs

        this.paginator.pageSize = this.pageSizeOptions[0];
        this.dataSource = new MatTableDataSource(resp.data.getAllRecipes.recipes)

      } else {
        this.paginator.length = 0;
        this.dataSource.data = [];
      }
    },
    (err) => {
      this.paginator.length = 0;
      this.dataSource.data = [];
    })
    this.searchFilter()
  }

  @ViewChild('paginator') paginator!: MatPaginator;

  pagination:any;
  // pageSizeOptions:any;
  pageSizeOptions: number[] = [10]

  onPaginatorChange(event: PageEvent) {
    const pagination = {
      limit: event.pageSize,
      page: event.pageIndex+1,
    }
    this.getDatas(pagination)
  }

  // --------------------------------------------------

  openDialog(): void {
    const dialogRef = this.dialog.open(InputComponent, {
      width: '50%',
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

  // --------------------------------------------------

  openDetail(parameter:any): void {
    const dialogRef = this.dialog.open(DetailComponent, {
      width: '50%',
      data: parameter,
      panelClass: 'bg-color',
      // disableClose: true,
      // hasBackdrop: true
    });

    console.log(parameter.id);
    

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getDatas() 
      }
      
    })
  }

  // ------------------------------------------------

  onDelete(parameter:any){
    Swal.fire({
      title: this.translateService.instant('stockTT.confirm1'),
      text: this.translateService.instant('stockTT.confirm6'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete now!'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.data.deleteRecepies(parameter)
        Swal.fire(
          this.translateService.instant('stockTT.confirm4'),
          this.translateService.instant('stockTT.confirm7'),
          'success'
        )
        this.getDatas()
      }
    })
  };

  // -----------------------------------------------------

  openUpdate(parameter:any): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '50%',
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

  // --------------------------------------------------

  updateStatus(event:any, data:any) {
    data = copy(data)
    if (data.status === 'publish') {
      data.status = 'unpublish'
    }
    else if (data.status === 'unpublish') {
      data.status = 'publish'
    }
    else {
      data.status = 'deleted'
    }
    Swal.fire({
      title: this.translateService.instant('menusT.a') + data.status + '?',
      showDenyButton: false,
      showCancelButton: true,
      showConfirmButton: true,
      denyButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.subs.sink = this.data.updateAvailable(data).subscribe(resp => {
          if (resp) {
            this.getDatas(true)
            Swal.fire(this.translateService.instant('menusT.b') + data.status)
            .then((res) => {
              // this.router.navigate(['menu'])
            })
          }
        })
      } else {
        event.source.checked = !event.source.checked
      }
    })
  }

  // ---------------------------------------------

  value = '';
  nameFilter = new FormControl();
  search : any;

  searchFilter() {
    this.nameFilter.valueChanges.pipe(debounceTime(300)).subscribe((val) => {
      this.search = val
      this.getDatas()
    });
  }

  // ----------------------------------------------

  statusFilter = new FormControl();
  statusF:any
  valuee = '';

  statusFilterr() {
    this.statusFilter.valueChanges.pipe(debounceTime(300)).subscribe((val) => {
      this.statusF = val
      this.getDatas()
    });
  }

  // ----------------------------------------------

  updateMenu(event:any, dataa:any) {
    dataa = copy(dataa)
    if (dataa.highlight === false) {
      dataa.highlight = true
    }
    else if (dataa.highlight === true) {
      dataa.highlight = false
    } else {
      dataa.highlight === false
    }
    Swal.fire({
      title: this.translateService.instant('menusT.a' ) + dataa.highlight + '?',
      showDenyButton: false,
      showCancelButton: true,
      showConfirmButton: true,
      denyButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.subs.sink = this.data.updateMenu(dataa).subscribe(resp => {
        if (resp) {
          this.getDatas(true)
          Swal.fire(this.translateService.instant('menusT.b' ) + dataa.highlight)
          .then((res) => {
              // this.router.navigate(['homepage'])
            })
          }
        })
      } else {
        event.source.checked = !event.source.checked
      }
    }) 
  }

  //----------------------------------------------------

  updateSpecial(event:any, data:any) {
    data = copy(data)
    if (data.special_offer === true) {
      data.special_offer = false
    } else {
      data.special_offer = true
    }
    Swal.fire({
      title: this.translateService.instant('menusT.a') + data.special_offer + '?',
      showDenyButton: false,
      showCancelButton: true,
      showConfirmButton: true,
      denyButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.subs.sink = this.data.updateSpecial(data).subscribe(resp => {
          if (resp) {
            this.getDatas(true)
            Swal.fire(this.translateService.instant('menusT.b') + data.special_offer)
            .then((res) => {
              // this.router.navigate(['homepage'])
            })
          }
        })
      } else {
        event.source.checked = !event.source.checked
      }
    })
  }

}
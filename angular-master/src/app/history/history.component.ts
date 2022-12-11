import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs';
import { SubSink } from 'subsink';
import { DetailComponent } from './detail/detail.component';
import { DataService } from './service/data.service';

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  status: Status[] = [
    {value: '', viewValue: this.translateService.instant('all')},
    {value: 'success', viewValue: this.translateService.instant('success')},
    {value: 'failed', viewValue: this.translateService.instant('failed')},
  ];

  private subs = new SubSink();
  recipe_names: any;
  balancee: any;
  user_type: any;

  constructor(
    private translateService: TranslateService,
    private data: DataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDatas()
    this.searchFilter()
    this.statusFilterr()
    this.nameFilterr()
    this.getBalance()
    this.user_type = JSON.parse(localStorage.getItem('user_type')!)
  }

  displayedColumns: string[] = ['name', 'detail', 'order_date', 'total_price', 'order_status'];

  dataSource: MatTableDataSource <any> = new MatTableDataSource();

  selection = new SelectionModel <any> (true, [])

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
      limit: paginationObj?.limit ?? 10
    }

    this.subs.sink = this.data.getHistory(pagination, this.search, this.statusF, this.statusLast).valueChanges.subscribe((resp: any) => {
      if(resp?.data?.getAllTransaction){
        this.paginator.length = resp.data.getAllTransaction.totalDocs;  
        this.paginator.pageSize = this.pageSizeOptions[0];
        this.dataSource = new MatTableDataSource(resp.data.getAllTransaction.transactions)
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

  getBalance() {
    let user_id = JSON.parse(localStorage.getItem('user_id') !);
    const idz = {
      getOneUserId : user_id
    }
    this.subs.sink = this.data.getBALANCE(idz).valueChanges.subscribe((item:any) => {
      this.balancee = item.data.getOneUser.balance
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

  // -----------------------------------------------

  statusFilter = new FormControl();
  statusF:any

  statusFilterr() {
    this.statusFilter.valueChanges.pipe(debounceTime(300)).subscribe((val) => {
      this.statusF = val
      this.getDatas()
    });
  }

  // -----------------------------------------------

  lastFilter = new FormControl();
  statusLast:any
  valuee = '';

  nameFilterr() {
    this.lastFilter.valueChanges.pipe(debounceTime(300)).subscribe((val) => {
      this.statusLast = val
      this.getDatas()
    });
  }

  //----------------------------------------------------

  openDialog(parameter: any): void {
    const dialogRef = this.dialog.open(DetailComponent, {
      width: '70%',
      data: parameter,
      disableClose: true,
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe((result: any) => {      
    })
  }

}

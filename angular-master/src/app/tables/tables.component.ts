import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { QueryRef } from 'apollo-angular';
import { DataService } from '../data.service';
import { Datas } from '../model/card.model';
import { SubSink } from 'subsink';
import { InputComponent } from './input/input.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  public isLoadingg: boolean = false;

  private subs = new SubSink();

  Datas: Datas[] = []
  ref: any;
  promos: any;

  constructor(private data: DataService, public dialog: MatDialog, private translateService : TranslateService) {}

  ngOnInit(): void {
    this.subs.sink = this.data
      .getPromos(this.pagination).valueChanges
      .subscribe((resp: any) => {
        this.dataSource = new MatTableDataSource(resp);
        this.Datas.push(resp.data.GetAllPromos)
        this.dataSource = new MatTableDataSource(resp.data.GetAllPromos)
      });

    this.initPaginator();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  postsQuery!: QueryRef < {
    posts: Datas[]
  } > ;

  displayedColumns: string[] = ['ref', 'title', 'subs', 'des'];

  dataSource: MatTableDataSource < Datas > = new MatTableDataSource();

  selection = new SelectionModel < Datas > (true, [])

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
      data: {
        name: this.ref
      },
      disableClose: true,
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ref = result;
    });
  }

  // pagination

  @ViewChild('paginator') paginator!: MatPaginator;

  pageSizeOptions: number[] = [13];
  
  pagination: any = {
    page: 0,
    limit: 13
  }
  
  initPaginator() {
    this.data
      .getPromosLength()
      .subscribe((length:any) => {
        // update paginator length
        this.paginator.length = length;
        this.paginator.pageSize = this.pageSizeOptions[0]; // 5
      });
  }

  onPaginatorChange(event: PageEvent) {
    this.pagination.limit = event.pageSize;
    this.pagination.page = event.pageIndex;

    // refetch data
    this.refetchData();
  }

  refetchData() {
    const pagination = this.pagination;
    this.data.getPromos(pagination).refetch();
  }

  // language

  setLanguage(lang: string) {
    this.translateService.use(lang);
  }

  selectedLang = 'en';

}

import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SubSink } from 'subsink';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef < DetailComponent > ,
    @Inject(MAT_DIALOG_DATA) public datas: any,
    private data: DataService,
  ) { }

  ngOnInit(): void {
    this.dataz = this.datas.total_price
  }
  
  private subs = new SubSink();
  a:any;
  b:any;
  c:any;
  dataz:any

  getDatas(paginationObj?: any) {

    const pagination: any = {
      page: paginationObj?.page ?? 0,
      limit: paginationObj?.limit ?? 10
    }

    this.subs.sink = this.data.getHistory(pagination, this.a, this.b, this.c).valueChanges.subscribe((resp: any) => {
      this.dataz = new MatTableDataSource(resp.data.getAllTransaction.transactions.total_price)
    })
  }

  displayedColumns: string[] = ['name', 'stock', 'note', 'stock_used' ];

  dataSource: MatTableDataSource <any> = new MatTableDataSource();

  selection = new SelectionModel <any> (true, [])

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  onClose() {
    this.dialogRef.close()
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

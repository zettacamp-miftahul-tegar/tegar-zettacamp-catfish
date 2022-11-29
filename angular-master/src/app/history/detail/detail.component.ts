import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
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
    private data: DataService,
  ) { }

  ngOnInit(): void {
    this.getDatas()
  }

  displayedColumns: string[] = ['recipe_name','note', 'price'];

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

  private subs = new SubSink();

  a:any;
  b:any;
  c:any;
  d:any;

  getDatas() {
    this.subs.sink = this.data.getHistory(this.a, this.b, this.c, this.d).valueChanges.subscribe((resp: any) => {
      this.dataSource = new MatTableDataSource(resp.data.getAllTransaction.transactions)
      console.log(this.dataSource);
    })

  }

}

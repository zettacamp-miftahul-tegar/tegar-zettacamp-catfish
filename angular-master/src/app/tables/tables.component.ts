import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SubSink } from 'subsink';
import { DataService } from '../data.service'
import { Users } from '../model/table.model';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  private subs = new SubSink();

  users:Users[]=[]

  constructor(private data : DataService) { }

  ngOnInit(): void {
    this.subs.sink = this.data.getTables().subscribe(resp => {
      this.users.push(resp.data.GetAllSchools)
      this.dataSource = new MatTableDataSource(resp.data.GetAllSchools)
      console.log(this.users);
  })}

  displayedColumns: string[] = ['short', 'long', 'status'];

  dataSource: MatTableDataSource <Users> = new MatTableDataSource();

  selection = new SelectionModel<Users>(true, [])

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

}

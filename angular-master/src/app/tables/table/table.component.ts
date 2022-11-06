import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { DropdownOption } from '../model/dropdown.model'
import { MatTableDataSource } from '@angular/material/table';
import { Datas } from '../model/data.model'
import { sources } from '../model/drop.model'
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import { Data } from '@angular/router';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  users: any;
  value = '';
  value1 = '';
  value2 = '';
  
  dataSource: MatTableDataSource <Datas> = new MatTableDataSource();

  currenStatus!: Datas;
  filteredValues: any = {
    name: '',
    user_type: '',
    email: '',
    user_status : '',
  };

  displayedColumns: string[] = ['select', 'name', 'user_type', 'email', 'status', 'action'];

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.userList$.subscribe(bebas => {
      this.dataSource.data = bebas;
      console.log(this.dataSource);
    
      this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
        this.filteredValues['name'] = nameFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      });
      this.userTypeFilter.valueChanges.subscribe((userTypeFilterValue) => {
        this.filteredValues['user_type'] = userTypeFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      });
      this.emailFilter.valueChanges.subscribe((emailFilterValue) => {
        this.filteredValues['email'] = emailFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      });
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
      this.sourceFilter.valueChanges.subscribe((sourceFilterValue) => {
        this.filteredValues['user_status'] = sourceFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      });
      // this.fieldListener();
  };

  availableSources: DropdownOption[] = sources;

  sourceFilter = new FormControl('');
  nameFilter = new FormControl();
  userTypeFilter = new FormControl();
  emailFilter = new FormControl();

  customFilterPredicate() {
    const myFilterPredicate = function (data: Datas, filter: string): boolean {
      // console.log(data, filter);

      let searchString = JSON.parse(filter);

      let nameFound =
        data.last_name
        .toString()
        .trim()
        .toLowerCase()
        .includes((searchString.name || '').toLowerCase())

      let userTypeFound =
        data.company.user_type
        .toString()
        .trim()
        .toLowerCase()
        .includes((searchString.user_type || '').toLowerCase())

      let emailFound = data.email.includes(searchString.email || '')

      let statusFound = data.user_status.includes(searchString.user_status || '');

      return nameFound && userTypeFound && emailFound && statusFound;
    };
    return myFilterPredicate;
  }

  selection = new SelectionModel<Datas>(true, [])

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

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Datas): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id + 1}`;
  }
}

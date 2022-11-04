import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DropdownOption } from '../model/dropdown.model'
import { MatTableDataSource } from '@angular/material/table';
import { Datas } from '../model/data.model'
import { sources } from '../model/drop.model'
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  users: any;
  
  dataSource: MatTableDataSource <Datas> = new MatTableDataSource();

  currenStatus!: Datas;
  filteredValues: any = {
    name: '',
    user_type: '',
    email: '',
    user_status : '',
  };

  displayedColumns: string[] = ['name', 'user_type', 'email', 'status'];

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
}

// const nameMatch = true
// const userTypeMatch = true
// return nameMatch && userTypeMatch

// return contact.user_status.indexOf(searchTerms.user_status) !== -1 && contact.first_name.toLowerCase().indexOf(nameMatch.first_name) || contact.last_name.toLowerCase().indexOf(nameMatch.civility) || contact.civility.toLowerCase().indexOf(nameMatch.last_name) && contact.company.user_type.toLowerCase().includes(filter) && contact.email.toLowerCase().includes(filter);

// fil = fil.value
// fil = fil.trim().toLowerCase()
// this.dataSource.filter = fil


// names(fil:any){
//   this.dataSource.filterPredicate = function(data:any, filter: string) {
//     console.log(data);
//     return data.first_name.toLowerCase().includes(filter) || data.last_name.toLowerCase().includes(filter) || data.civility.toLowerCase().includes(filter)
//   };

//   fil = fil.value
//   fil = fil.trim().toLowerCase()
//   this.dataSource.filter = fil

// }

// userz(fil:any){
//   this.dataSource.filterPredicate = function(data:any, filter: string) {
//     console.log(data);
//     return data.company.user_type.toLowerCase().includes(filter)
//   };

//   fil = fil.value
//   fil = fil.trim().toLowerCase()
//   this.dataSource.filter = fil

// }

// emails(fil:any){
//   this.dataSource.filterPredicate = function(data:any, filter: string) {
//     console.log(data);
//     return data.email.toLowerCase().includes(filter)
//   };

//   fil = fil.value
//   fil = fil.trim().toLowerCase()
//   this.dataSource.filter = fil

// }

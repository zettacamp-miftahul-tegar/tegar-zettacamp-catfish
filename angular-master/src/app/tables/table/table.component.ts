import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DropdownOption } from '../model/dropdown.model'
import { MatTableDataSource} from '@angular/material/table';
import { Datas } from '../model/data.model'
import { sources} from '../model/drop.model'
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  users: any;
  dataSource: MatTableDataSource<Datas> = new MatTableDataSource();

  currenStatus!: Datas;

  displayedColumns: string[] = ['name', 'user_type', 'email', 'status'];
  
  constructor(private data: DataService ) { }

  ngOnInit(): void {
    this.data.userList$.subscribe(bebas => {
      this.dataSource.data = bebas;
      console.log(this.dataSource);
    });
    this.fieldListener();
    this.dataSource.filterPredicate = this.createFilter();
  };

  availableSources: DropdownOption[] = sources;
  
  sourceFilter = new FormControl('');

  filterValues: any = {
    user_status: ''
  }

  private fieldListener() {
    this.sourceFilter.valueChanges
      .subscribe(
        user_status => {
          console.log(user_status);
          
          this.filterValues.user_status = user_status;
          this.dataSource.filter = JSON.stringify(this.filterValues);
          console.log(this.dataSource);
          
        }
      )
  }

  private createFilter(): (contact: Datas, filter: string) => boolean {
    let filterFunction = function (contact: any, filter: any): boolean {
      let searchTerms = JSON.parse(filter);
      return contact.user_status.indexOf(searchTerms.user_status) !== -1;
    }
    return filterFunction;
  }

  names(fil:any){
    this.dataSource.filterPredicate = function(data:any, filter: string) {
      console.log(data);
      return data.first_name.toLowerCase().includes(filter) || data.last_name.toLowerCase().includes(filter) || data.civility.toLowerCase().includes(filter)
    };

    fil = fil.value
    fil = fil.trim().toLowerCase()
    this.dataSource.filter = fil

  }

  userz(fil:any){
    this.dataSource.filterPredicate = function(data:any, filter: string) {
      console.log(data);
      return data.company.user_type.toLowerCase().includes(filter)
    };

    fil = fil.value
    fil = fil.trim().toLowerCase()
    this.dataSource.filter = fil

  }

  emails(fil:any){
    this.dataSource.filterPredicate = function(data:any, filter: string) {
      console.log(data);
      return data.email.toLowerCase().includes(filter)
    };

    fil = fil.value
    fil = fil.trim().toLowerCase()
    this.dataSource.filter = fil

  }
}
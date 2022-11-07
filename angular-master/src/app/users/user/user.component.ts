import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from '../model/user.model';
import { UsersService } from '../users.service';
import { InputComponent } from '../input/input.component'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  lat_name!: string;

  constructor(private data: UsersService, public translateService: TranslateService, public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(InputComponent, {
      width: '100%',
      data: {popUp: this.lat_name},
      disableClose: true,
      hasBackdrop: true
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.lat_name = result;

      console.log(result);
      
    });
  }

  ngOnInit(): void {
    this.data.userList$.subscribe(bebas => {
      this.dataSource.data = bebas; 
    })
    // console.log(this.dialog);
    
  }

  displayedColumns: string[] = ['Civility', 'Last_Name', 'First_Name', 'Date_of_Birth', 'Gender'];
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

  setLanguage(lang: string) {
    this.translateService.use(lang);
  }

  selectedLang = 'en';

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private data:UserService, private formBuilder: FormBuilder) {};

  users: any;
  searchForm : any;
  filterBy: string = '';

  ngOnInit(): void {
    this.data.userList$.subscribe(bebas => {
      this.users = bebas;
      console.log(bebas);
    });
  }

  // setLanguage(lang: string) {
  //   this.translateService.use(lang);
  // }

}

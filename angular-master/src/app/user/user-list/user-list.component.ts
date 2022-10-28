import { Component, OnInit } from '@angular/core';
// import { User } from '../model/user.model'
import { UserService } from '../user.service'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  // selectedLang = 'en';

  constructor(private data:UserService) {};

  users: any;
  // selectedUser: User | null = null;

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

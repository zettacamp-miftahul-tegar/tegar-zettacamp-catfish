import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Users } from './model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { 
    this.dummyInitList();
  }

  private userList = new BehaviorSubject<Users[]>([]);
  userList$ = this.userList.asObservable();

  userDatas:any;

  dummyInitList() {
    this.fetchDataJson().subscribe(resp => {
      this.userDatas = resp;
      this.setAllDataLists(resp);
    })
  }

  fetchDataJson() {
    return this.httpClient.get<any>('../../assets/users.json');
  }

  setAllDataLists(data: Users[]) {
    this.userList.next(data);
  }

  addUser(val:any) {
    this.userDatas.push(val)
    this.userList.next(this.userDatas)
  }

}

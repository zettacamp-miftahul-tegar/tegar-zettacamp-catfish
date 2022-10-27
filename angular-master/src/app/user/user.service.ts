import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from './model/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usert: any;
  
  // membuat bahavior baru
  private userList = new BehaviorSubject<User[]>([]);
  userList$ = this.userList.asObservable();

  private selectedUser = new BehaviorSubject<User | null>(null);
  selectedUser$ = this.selectedUser.asObservable();

  userData:any;

  constructor(private httpClient: HttpClient) { 
    this.dummyInitList();
  }

  dummyInitList() {
    this.fetchDataJson().subscribe(resp => {
      this.userData = resp.users;
      this.setAllDataLists(this.userData);
      // console.log(resp)
    })
    
  }

  addUser(val:any) {
    this.userData.push(val)
    // console.log(this.bookData);
    this.userList.next(this.userData)
  }

  updateData(currentId: any, newValue: any){
    // console.log(this.usert[0].id);
    let index = parseInt(currentId)-1;
    if(this.usert[index].id == currentId){
    this.usert[index] = newValue;
    }
  }

  fetchDataJson() {
    return this.httpClient.get<any>('../../assets/user.json');
  }

  setAllDataLists(data: User[]) {
    this.userList.next(data);
  }

  setSelectedData(data1: User) {
    this.selectedUser.next(data1);
  }

  resetSelectedData() {
    this.selectedUser.next(null);
  }

  getBooks(): User[] {
    return this.userList.getValue()
  }

  getBookById(id: number): User {
    return this.getBooks().filter(acc => acc.id == id)[0];
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './model/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // users : any;

  bookUrl="api/books"
  
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
    this.userList.next(this.userData)
  }

  updateData(currentId: string, newValue: any){
    // console.log(this.userData[0].id);
    let index = parseInt(currentId)-1;
    if(this.userData[index].id == currentId){
    this.userData[index] = newValue;
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

 

  // userDelete(id:number):Observable<number>{
  //   let httpheaders=new HttpHeaders()
  //   .set('Content-type','application/Json');
  //   let options={
  //     headers:httpheaders
  //   };
  //   return this.httpClient.delete<number>(this.userData.id);
  // }

  // getBooksFromStore():Observable<User[]>{
  //   return this.httpClient.get<User[]>(this.userData.id);
  // }

}

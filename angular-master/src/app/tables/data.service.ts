import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Datas } from './model/data.model'

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private httpClient: HttpClient) { 
    this.dummyInitList();
  }

  private userList = new BehaviorSubject<Datas[]>([]);
  userList$ = this.userList.asObservable();

  private selectedUser = new BehaviorSubject<Datas | null>(null);
  selectedUser$ = this.selectedUser.asObservable();

  userDatas:any;

  dummyInitList() {
    this.fetchDataJson().subscribe(resp => {
      this.userDatas = resp;
      this.setAllDataLists(resp);
    })
  }

  fetchDataJson() {
    return this.httpClient.get<any>('../../assets/data.json');
  }

  setAllDataLists(data: Datas[]) {
    this.userList.next(data);
  }
  
  // addUser(val:any) {
  //   this.userDatas.push(val)
  //   this.userList.next(this.userDatas)
  // }

  // updateData(currentId: string, newValue: any){
  //   let index = parseInt(currentId)-1;
  //   if(this.userDatas[index].id == currentId){
  //   this.userDatas[index] = newValue;
  //   }
  // }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Datas } from './model/data.model'

@Injectable({
  providedIn: 'root'
})

export class DataService {
  [x: string]: any;

  constructor(private httpClient: HttpClient) { 
    this.dummyInitList();
  }

  private userList:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  userList$ = this.userList.asObservable();

  userDatas:any;

  dummyInitList() {
    this.fetchDataJson().subscribe(resp => {
      this.setAllDataLists(resp);
    })
  }

  fetchDataJson() {
    return this.httpClient.get<any>('../../assets/data.json');
  }

  setAllDataLists(data: Datas[]) {
    this.userList.next(data);
  }
  
}

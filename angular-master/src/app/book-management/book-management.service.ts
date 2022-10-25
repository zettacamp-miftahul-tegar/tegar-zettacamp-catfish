import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Data } from './data.model'

@Injectable({
  providedIn: 'root'
})
export class BookManagementService {

  bookList: BehaviorSubject<Data[]> = new BehaviorSubject<Data[]>([]);
  bookList$ = this.bookList.asObservable();

  selectedData: BehaviorSubject<Data | null> = new BehaviorSubject<Data | null>(null);
  selectedData$ = this.selectedData.asObservable();

  constructor(private httpClient: HttpClient) { 
    this.dummyInitList();
  }

  dummyInitList() {
    this.fetchUserJson().subscribe(resp => {
      let usersData = resp.bookList;
      this.setAllUsersLists(usersData);
    })
  }

  fetchUserJson() {
    return this.httpClient.get<any>('../../assets/data.json');
  }

  setAllUsersLists(data: Data[]) {
    this.bookList.next(data);
  }

  setSelectedData(data1: Data) {
    this.selectedData.next(data1);
  }

  // resetSelectedUser() {
  //   this.selectedUser.next(null);
  // }

  // resetAllStudentsLists() {
  //   this.bookList.next([]);
  // }

  // getValuetAllStudentsLists(): Data[] {
  //   return this.bookList.getValue();
  // }
}

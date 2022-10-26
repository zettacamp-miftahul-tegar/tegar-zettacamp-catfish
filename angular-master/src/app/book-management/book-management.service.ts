import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Data } from './data.model'

@Injectable({
  providedIn: 'root'
})
export class BookManagementService {

  // membuat bahavior baru
  private bookList = new BehaviorSubject<Data[]>([]);
  bookList$ = this.bookList.asObservable();

  private selectedData = new BehaviorSubject<Data | null>(null);
  selectedData$ = this.selectedData.asObservable();

  constructor(private httpClient: HttpClient) { 
    this.dummyInitList();
  }

  dummyInitList() {
    this.fetchDataJson().subscribe(resp => {
      let bookData = resp.bookList;
      this.setAllDataLists(bookData);
    })
  }

  fetchDataJson() {
    return this.httpClient.get<any>('../../assets/data.json');
  }

  setAllDataLists(data: Data[]) {
    this.bookList.next(data);
  }

  setSelectedData(data1: Data) {
    this.selectedData.next(data1);
  }

  resetSelectedData() {
    this.selectedData.next(null);
  }
}

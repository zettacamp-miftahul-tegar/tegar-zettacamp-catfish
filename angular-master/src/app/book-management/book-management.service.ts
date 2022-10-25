import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookManagementService {

  constructor() { }

  bookList = [
    {
      nama: 'senja berkumandang',
      pengarang: 'miftahul',
      penerbit: 'miftah',
      tanggal: '20 agustus 2022',
      terbit: '25 agustus 2022'
    },
    {
      nama: 'sore hari ',
      pengarang: 'tegar',
      penerbit: 'teg',
      tanggal: '12 april 2022',
      terbit: '30 april 2022'
    },
    {
      nama: 'conan',
      pengarang: 'pangestu',
      penerbit: 'tegpang',
      tanggal: '1 januari 2022',
      terbit: '12 januari 2022'
    }
  ]
}

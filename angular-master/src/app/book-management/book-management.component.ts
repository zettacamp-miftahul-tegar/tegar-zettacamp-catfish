import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { BookManagementService } from './book-management.service';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.css']
})
export class BookManagementComponent implements OnInit {

  selectedData: Data | null = null;

  constructor(private usersService: BookManagementService) {}

  ngOnInit(): void {
    // jika ada perubahan, maka itu akan memperbarui Pengguna yang dipilih
    this.usersService.selectedData$.subscribe((data) => {
      this.selectedData = data;
    });
  }

}

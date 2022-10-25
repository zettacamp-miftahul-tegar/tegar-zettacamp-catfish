import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { BookManagementService } from './book-management.service';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.css']
})
export class BookManagementComponent implements OnInit {
[x: string]: any;

  selectedData: Data | null = null;

  constructor(private usersService: BookManagementService) {}

  ngOnInit(): void {
    // Observe to selecteduser behaviourSubject, if there is change, then it will update selectedUser
    this.usersService.selectedUser$.subscribe((user) => {
      this.selectedData = user;
    });
  }

}

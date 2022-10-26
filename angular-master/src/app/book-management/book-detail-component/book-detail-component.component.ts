import { Component, Input, OnInit } from '@angular/core';
import { Data } from '../data.model'
import { BookManagementService } from '../book-management.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-detail-component',
  templateUrl: './book-detail-component.component.html',
  styleUrls: ['./book-detail-component.component.css']
})
export class BookDetailComponentComponent implements OnInit {

  @Input() card: any;

  constructor(private route: ActivatedRoute, private data: BookManagementService) { }
  
  ngOnInit(): void {
    this.data.selectedData$.subscribe((data1) => {
      this.selectedData = data1;
    });

    this.card = {
      id : this.route.snapshot.params['id'],
      nama : this.route.snapshot.params['nama'],
      pengarang : this.route.snapshot.params['pengarang'],
      penerbit : this.route.snapshot.params['penerbit'],
      tanggal : this.route.snapshot.params['tanggal'],
      terbit : this.route.snapshot.params['terbit'],
    },
    console.log(this.card);
    
  }

  selectedData: Data | null = null;

  closeDetail() {
    this.data.resetSelectedData();
  }

}

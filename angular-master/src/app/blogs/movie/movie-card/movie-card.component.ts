import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service'
import { Datas } from '../../model/data.model'

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  constructor(private data: DataService, private router:Router ) {};

  ngOnInit(): void {
  }

  @Input() movie: any;

  selectData(movie: Datas){
    this.data.setSelectedData(movie);
  }

  onClick(items:any){
    this.router.navigate([`home/${this.movie.id}`])
  }

}

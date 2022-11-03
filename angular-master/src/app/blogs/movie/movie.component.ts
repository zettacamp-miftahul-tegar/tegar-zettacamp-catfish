import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../data.service'

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(private data:DataService, private formBuilder: FormBuilder) {};

  movies: any;
  // searchForm : any;
  // filterSekarang: string = '';

  ngOnInit(): void {
    this.data.movieList$.subscribe(bebas => {
      this.movies = bebas;
      console.log(bebas);
    })
  };
}
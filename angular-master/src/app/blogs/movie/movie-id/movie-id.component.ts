import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../data.service'

@Component({
  selector: 'app-movie-id',
  templateUrl: './movie-id.component.html',
  styleUrls: ['./movie-id.component.css']
})
export class MovieIdComponent implements OnInit {

  movies: any;
  
  constructor(private data: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = parseInt(params.get('id')!, 10);
      this.movies = this.data.getMovieById(id);
    });    

    // this.data.movieList$.subscribe(bebas => {
    //   this.movies = bebas;
    //   console.log(bebas);
    // });

    // let id = this.route.snapshot.params['id'] 
    // let subs = this.data.getMovieById(id)
    // subs.subscribe((das:any) => {
    //   this.movies = das;
    //   console.log(das);
      
    // });
  }

}

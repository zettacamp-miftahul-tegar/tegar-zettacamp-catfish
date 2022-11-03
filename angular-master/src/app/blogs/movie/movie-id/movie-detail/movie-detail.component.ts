import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../../data.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Datas } from '../../../model/data.model'
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  id: any;
  bebas: any;
  signupForm!: FormGroup;
  movie:any;
  
  actorList: Datas | null | undefined;

  constructor(private data: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let id = this.route.snapshot.params['id'] 
    let subs = this.data.getMovieById(id)
    subs.subscribe((das:any) => {
      this.movie = das;
    });

    // this.data.movieList$.subscribe(data => {
    //   this.bebas = data;
    //   this.actorList = this.data.getMovieById(this.bebas);
    // })

    // this.getData();

  }

  getData() {
    this.data.actorList$.subscribe(x => {
      this.bebas = x;
      let datas = this.bebas.filter((x: { id: any; }) => x.id == this.id);
      console.log(this.id);
      
      let a = this.signupForm.patchValue(datas[0]);
    });
  }

}

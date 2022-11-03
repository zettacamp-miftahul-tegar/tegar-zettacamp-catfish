import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actor-id',
  templateUrl: './actor-id.component.html',
  styleUrls: ['./actor-id.component.css']
})
export class ActorIdComponent implements OnInit {

  actors: any;

  constructor(private data:DataService, private route: ActivatedRoute) {};

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = parseInt(params.get('id')!, 10);
      this.actors = this.data.getMovieByIdA(id);
    });   
  }
}

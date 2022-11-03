import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../data.service'

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  constructor(private data:DataService) {};

  actors: any;

  ngOnInit(): void {
    this.data.actorData$.subscribe(bebas => {
      this.actors = bebas;
      console.log(bebas);
    })
  };

}

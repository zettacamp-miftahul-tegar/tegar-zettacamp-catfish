import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service'
import { Datas } from '../../model/data.model'
import { Actors } from '../../model/actors.model'

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.css']
})
export class ActorCardComponent implements OnInit {

  constructor(private data: DataService, private router:Router ) {};

  ngOnInit(): void {
  }

  @Input() actor: any;

  selectData(actor: Actors){
    this.data.setSelectedDataA(actor);
  }

  onClick(items:any){
    this.router.navigate([`actor/${this.actor.id}`])
  }

}

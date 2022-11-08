import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { DataService } from '../data.service'
import { Datas } from '../model/card.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  private subs = new SubSink();

  Datas:Datas[]=[]

  constructor(private data : DataService) { }

  ngOnInit(): void {
    this.subs.sink = this.data.getCards().subscribe(resp => {
      this.Datas.push(resp.data.GetAllPromos[0])
      console.log(resp.data.GetAllPromos);
  })}
}
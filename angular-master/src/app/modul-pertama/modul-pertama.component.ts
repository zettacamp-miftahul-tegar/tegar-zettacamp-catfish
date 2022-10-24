import { Component, Input, OnInit } from '@angular/core';
import { FoodsService } from './foods.service';

@Component({
  selector: 'app-modul-pertama',
  templateUrl: './modul-pertama.component.html',
  styleUrls: ['./modul-pertama.component.css'],
  providers: [FoodsService]
})
export class ModulPertamaComponent implements OnInit {

  cards: any;

  constructor(public data:FoodsService) {};

  // cards:{}[] = [];

  ngOnInit(): void {
    this.cards = this.data.cards;
  }

  onAccountAdded(newCard: {title: string, price: string, status: string}) {
    this.cards.push(newCard);
  }

  onStatusChanged(updateInfo: {id: number, newStatus: string}) {
    this.cards[updateInfo.id].status = updateInfo.newStatus
  }

}

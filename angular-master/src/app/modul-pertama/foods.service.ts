import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {

  constructor() { }

  cards = [
    {
      title: 'Ice Tea',
      price: '3000',
      status: 'Like'
    },
    {
      title: 'Lemon Tea',
      price: '5000',
      status: 'Dislike'
    },
    {
      title: 'Black Coffea',
      price: '5000',
      status: 'Like'
    }
  ];
}

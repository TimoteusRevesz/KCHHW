import { Injectable } from '@angular/core';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root',
})
export class ShoeService {
  private cards: Card[] = [
    {
      src: '40969-80-a.jpg',
    },
    {
      src: '42106-00-a.jpg',
    },
    {
      src: '62676-80-a.jpg',
    },
    {
      src: '64211-52-a.jpg',
    },
    {
      src: 'D0700-22-a.jpg',
    },
    {
      src: 'L1752-60-a.jpg',
    },
    {
      src: 'L1759-30-a.jpg',
    },
    {
      src: 'L4850-00-a.jpg',
    },
    {
      src: 'N1963-33-a.jpg',
    },
    {
      src: 'Z9610-00-a.jpg',
    },
    {
      src: '40969-80-a.jpg',
    },
    {
      src: '42106-00-a.jpg',
    },
    {
      src: '62676-80-a.jpg',
    },
    {
      src: '64211-52-a.jpg',
    },
    {
      src: 'D0700-22-a.jpg',
    },
    {
      src: 'L1752-60-a.jpg',
    },
    {
      src: 'L1759-30-a.jpg',
    },
    {
      src: 'L4850-00-a.jpg',
    },
    {
      src: 'N1963-33-a.jpg',
    },
    {
      src: 'Z9610-00-a.jpg',
    },
  ];

  constructor() {}

  public getAllCards(): Card[] {
    return this.shuffleCards(this.cards);
  }

  private shuffleCards(cards: Card[]): Card[] {
    let currentIndex = cards.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [cards[currentIndex], cards[randomIndex]] = [
        cards[randomIndex],
        cards[currentIndex],
      ];
    }

    return cards;
  }
}

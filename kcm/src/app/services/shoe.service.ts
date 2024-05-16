import { Injectable } from '@angular/core';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root',
})
export class ShoeService {
  private cards: Card[] = [
    {
      id: Symbol('40969-80-a.jpg'),
      src: '40969-80-a.jpg',
    },
    {
      id: Symbol('42106-00-a.jpg'),
      src: '42106-00-a.jpg',
    },
    {
      id: Symbol('62676-80-a.jpg'),
      src: '62676-80-a.jpg',
    },
    {
      id: Symbol('64211-52-a.jpg'),
      src: '64211-52-a.jpg',
    },
    {
      id: Symbol('D0700-22-a.jpg'),
      src: 'D0700-22-a.jpg',
    },
    {
      id: Symbol('L1752-60-a.jpg'),
      src: 'L1752-60-a.jpg',
    },
    {
      id: Symbol('L1759-30-a.jpg'),
      src: 'L1759-30-a.jpg',
    },
    {
      id: Symbol('L4850-00-a.jpg'),
      src: 'L4850-00-a.jpg',
    },
    {
      id: Symbol('N1963-33-a.jpg'),
      src: 'N1963-33-a.jpg',
    },
    {
      id: Symbol('Z9610-00-a.jpg'),
      src: 'Z9610-00-a.jpg',
    }
  ];

  constructor() {}

  public getAllCards(deckSize: number = 5): Card[] {
    const randomCards = this.getRandomElements(deckSize);
    
    return this.shuffleCards([...randomCards, ...randomCards]);
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

  private getRandomElements(count: number): Card[] { 
    if (count >= this.cards.length) {
      return [...this.cards];
    }
  
    const pickedIndices = new Set<number>();
    const result: Card[] = [];
  
    while (result.length < count) {
      const randomIndex = Math.floor(Math.random() * this.cards.length);
      if (!pickedIndices.has(randomIndex)) {
        pickedIndices.add(randomIndex);
        result.push(this.cards[randomIndex]);
      }
    }
  
    return result;
  }
}

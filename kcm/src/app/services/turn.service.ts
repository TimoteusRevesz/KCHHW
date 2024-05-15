import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Guess } from '../models/guess';

@Injectable({
  providedIn: 'root'
})
export class TurnService {
  private resetCard = new Subject<string>();  
  public resetCard$ = this.resetCard.asObservable();

  public guessCount: number = 0;

  public resetCards(src?: string): void {
    this.guessCount++;
    if (this.guessCount > 0) {
      this.resetCard.next(src ?? '');
    }
  }  

  public resetGame(): void {
    this.resetCard.next('RESET');
    this.guessCount = 0;

  }
}

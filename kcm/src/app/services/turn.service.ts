import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Guess } from '../models/guess';

@Injectable({
  providedIn: 'root'
})
export class TurnService {
  private resetCard = new Subject<symbol>();  
  private resetTable = new Subject<true>();  

  private guessCounter = 0;
  private guessCount = new BehaviorSubject<number>(0);  
  
  public resetCard$ = this.resetCard.asObservable();
  public resetTable$ = this.resetTable.asObservable();
  public guessCount$ = this.guessCount.asObservable();
 
  public resetCards(src?: symbol): void {
    this.guessCounter++;

    if (this.guessCounter > 0) {
      this.resetCard.next(src ?? Symbol());
      this.guessCount.next(this.guessCounter);
    }
  }  

  public resetGame(): void {
    this.guessCounter = 0;

    this.resetTable.next(true);
    this.guessCount.next(this.guessCounter);
  }
}

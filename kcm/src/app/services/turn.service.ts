import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TurnService {
  private resetCard = new Subject<symbol>();  
  private resetTable = new Subject<true>();   
  
  private guessCounter = 0;
  private guessCount = new BehaviorSubject<number>(0);  
  private newGame = new BehaviorSubject<number>(8); 
  private foundPairs: symbol[] = [];  
  private currentDeckSize: number = 0;
  
  public resetCard$ = this.resetCard.asObservable();
  public resetTable$ = this.resetTable.asObservable();
  public guessCount$ = this.guessCount.asObservable();
  public newGame$ = this.newGame.asObservable(); 
 
  constructor(private snackBar: MatSnackBar) {
  }

  public resetCards(src?: symbol): void {
    this.guessCounter++;

    if (this.guessCounter > 0) {
      this.resetCard.next(src ?? Symbol());
      this.guessCount.next(this.guessCounter);
    }
  }  

  public resetGame(): void { 
    this.resetTable.next(true);
    
    this.guessCounter = 0; 
    this.foundPairs = [];
    this.guessCount.next(this.guessCounter);
  }

  public pairFound(id: symbol): void {
    if (!this.foundPairs.includes(id)) {
      this.foundPairs.push(id);
    }

    if (this.currentDeckSize === this.foundPairs.length) {
      this.setBestScore(); 

      this.snackBar.open('All pairs found. Play again!', 'close', {
        duration: 5000,
        verticalPosition: 'top'
      });
    }
  }

  public startNewGame(deckSize: number): void{
    this.guessCounter = 0;  
    this.foundPairs = [];
    this.currentDeckSize = deckSize;
    this.newGame.next(deckSize);
  }

  public getBestScore(): number {
    const bestScore = localStorage.getItem('BestScore');

    return bestScore ? +bestScore : 0;
  }

  private setBestScore(): void {
    const bestScore = localStorage.getItem('BestScore');

    if (!bestScore) {
      // First best score
      localStorage.setItem('BestScore', (this.guessCounter).toString());
    } else if (this.currentDeckSize === this.foundPairs.length && +bestScore > this.guessCounter) {
      // Set new best score
      localStorage.setItem('BestScore', (this.guessCounter).toString());
    }
  }
}

import { Component } from '@angular/core';
import { Card } from '../models/card';
import { ActivatedRoute } from '@angular/router';
import { TurnService } from '../services/turn.service';
import { Guess } from '../models/guess';
import { ShoeService } from '../services/shoe.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  public cardList?: Card[];
  private guess: Guess = {
    firstGuess: undefined,
    secondGuess: undefined
  }
  
  constructor(
    private activatedRoute: ActivatedRoute, 
    private turnService: TurnService,
    private shoeService: ShoeService, 

  ) {   
    this.activatedRoute.data.subscribe(data => {
      this.cardList = this.activatedRoute.snapshot.data['data']; 
    });   
  }

  public resetGame(): void { 
    this.cardList = [...this.shoeService.getAllCards()]; 
    this.turnService.resetGame();
  }

  public cardFlippedEvent(id: symbol): void {
    if (!this.guess.firstGuess && !this.guess.secondGuess) {
      // First Guess
      this.guess.firstGuess = id; 
    } else if(this.guess.firstGuess && !this.guess.secondGuess) {
      // Send Second Guess
      this.guess.secondGuess = id;  
    } else if(this.guess.firstGuess && this.guess.secondGuess) { 
      // Reset Cards
      const resetSrc = this.guess.firstGuess === this.guess.secondGuess ? this.guess.firstGuess : undefined;
      this.turnService.resetCards(resetSrc);
      this.guess = {
        firstGuess: id,
        secondGuess: undefined
      }
    }
  }
}

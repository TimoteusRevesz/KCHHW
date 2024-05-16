import { Component, OnDestroy, OnInit } from '@angular/core';
import { Card } from '../../models/card';
import { ActivatedRoute } from '@angular/router';
import { TurnService } from '../../services/turn.service';
import { Guess } from '../../models/guess';
import { ShoeService } from '../../services/shoe.service';
import { Subscription } from 'rxjs'; 

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy{
  private guess: Guess = {
    firstGuess: undefined,
    secondGuess: undefined
  }
  private newGameSubscription?: Subscription;
  private resetSubscription?: Subscription;
  
  public cardList?: Card[];

  constructor(
    private activatedRoute: ActivatedRoute, 
    private turnService: TurnService,
    private shoeService: ShoeService 

  ) {   
    this.activatedRoute.data.subscribe(data => {
      this.cardList = this.activatedRoute.snapshot.data['data']; 
    });   
  }

  ngOnInit(): void {
    this.newGameSubscription = this.turnService.newGame$.subscribe((deckSize: number) => { 
      this.guess = {
        firstGuess: undefined,
        secondGuess: undefined
      }
      this.cardList = [...this.shoeService.getAllCards(deckSize)]; 
    })

    this.resetSubscription = this.turnService.resetTable$.subscribe(() => { 
      this.guess = {
        firstGuess: undefined,
        secondGuess: undefined
      } 
    }) 
  } 

  public cardFlippedEvent(id: symbol): void {
    if (!this.guess.firstGuess && !this.guess.secondGuess) {
      // First Guess
      this.guess.firstGuess = id; 
    } else if(this.guess.firstGuess && !this.guess.secondGuess) {
      // Send Second Guess
      this.guess.secondGuess = id;  
      const cardid = this.guess.firstGuess === this.guess.secondGuess ? this.guess.firstGuess : undefined;
      if (cardid) {
        this.turnService.pairFound(cardid);
      }
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

  ngOnDestroy(): void {
    this.newGameSubscription?.unsubscribe();
    this.resetSubscription?.unsubscribe();
  }
}

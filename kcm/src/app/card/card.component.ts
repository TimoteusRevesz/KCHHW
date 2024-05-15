import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CardState } from '../models/enums/card-state';
import { TurnService } from '../services/turn.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() src!: string;
  @Output() cardFlipped: EventEmitter<string> = new EventEmitter<string>();
  
  private resetCardSubscription?: Subscription;
  
  public CARDSTATE = CardState;
  public cardState: CardState = CardState.BACK;

  constructor(private turnService: TurnService) {
  }
  
  ngOnInit(): void {
    this.resetCardSubscription = this.turnService.resetCard$.subscribe((src: string) => {
      if (src === 'RESET') {
        this.cardState = CardState.BACK;
      } else if (this.cardState !== CardState.FOUND) {
        this.cardState = src === this.src ? CardState.FOUND : CardState.BACK;
      }
    })
  }

  public flipCard(): void {
    if (this.cardState === CardState.FOUND) {
      // We dont turn the card if it is already found
      return;
    }

    this.cardFlipped.next(this.src);
    this.cardState = this.cardState === CardState.BACK ? CardState.FRONT : CardState.BACK;
  }

  ngOnDestroy(): void {
    if (this.resetCardSubscription) {
      this.resetCardSubscription.unsubscribe();
    }
  }
}

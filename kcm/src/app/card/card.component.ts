import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CardState } from '../models/enums/card-state';
import { TurnService } from '../services/turn.service';
import { Subscription } from 'rxjs';
import { Card } from '../models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() card!: Card;
  @Output() cardFlipped: EventEmitter<symbol> = new EventEmitter<symbol>();

  private resetCardSubscription?: Subscription;
  private resetTableSubscription?: Subscription;

  public CARDSTATE = CardState;
  public cardState: CardState = CardState.BACK;

  constructor(private turnService: TurnService) {}

  ngOnInit(): void {
    this.resetTableSubscription = this.turnService.resetTable$.subscribe(
      (reset: boolean) => {
        this.cardState = CardState.BACK;
      }
    );

    this.resetCardSubscription = this.turnService.resetCard$.subscribe(
      (id: symbol) => {
        if (this.cardState !== CardState.FOUND) {
          this.cardState =
            this.card.id === id ? CardState.FOUND : CardState.BACK;
        }
      }
    );
  }
  public flipCard(): void {
    if (
      this.cardState === CardState.FOUND ||
      this.cardState === CardState.FRONT
    ) {
      // We dont turn the card if it is already found or flipped
      return;
    }

    this.cardFlipped.next(this.card.id);
    this.cardState =
      this.cardState === CardState.BACK ? CardState.FRONT : CardState.BACK;
  }

  ngOnDestroy(): void {
    if (this.resetCardSubscription) {
      this.resetCardSubscription.unsubscribe();
    }
    if (this.resetTableSubscription) {
      this.resetTableSubscription.unsubscribe();
    }
  }
}

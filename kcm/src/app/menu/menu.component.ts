import { Component, OnInit } from '@angular/core';
import { TurnService } from '../services/turn.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public guessCounter?: Observable<number>;
  public deckSizeList: number[] = [3,4,5,6,7,8,9]
  public form = new FormGroup({
    currentTries: new FormControl(0),
    best: new FormControl(),
    deckSize: new FormControl(8, Validators.required) 
  })
 
  constructor(private turnService: TurnService) {
  }

  ngOnInit(): void {
    this.guessCounter = this.turnService.guessCount$;
    this.setBestScore();
  }


  public reset(): void {
    this.turnService.resetGame();
    
    // refreshScore
    this.setBestScore();
  }

  public startNewGame(): void {
    // Flip everything back
    this.turnService.resetGame();

    // refresh cards
    const formValue = this.form.getRawValue();
    this.turnService.startNewGame(formValue.deckSize ?? 8);

    // refreshScore
    this.setBestScore();
  }

  private setBestScore(): void {
    const bestScore = this.turnService.getBestScore();
    this.form.controls.best.setValue(bestScore);
  }
}

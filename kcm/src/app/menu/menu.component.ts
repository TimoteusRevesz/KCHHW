import { Component, OnInit } from '@angular/core';
import { TurnService } from '../services/turn.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  guessCounter?: Observable<number>;
 
  constructor(private turnService: TurnService) {
  }

  ngOnInit(): void {
    this.guessCounter = this.turnService.guessCount$;
  }

  public reset(): void {
    this.turnService.resetGame();
  }

}

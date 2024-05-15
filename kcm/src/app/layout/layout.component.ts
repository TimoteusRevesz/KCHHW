import { Component } from '@angular/core';
import { TurnService } from '../services/turn.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(private turnService: TurnService) {
  }

  public reset(): void {
    this.turnService.resetGame();
  }

}

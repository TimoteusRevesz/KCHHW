import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamerRoutingModule } from './gamer-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { GameComponent } from './game/game.component';
import { CardComponent } from './card/card.component';
import { LayoutComponent } from './layout/layout.component';
import { MenuComponent } from './menu/menu.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LayoutComponent, 
    GameComponent,
    CardComponent,
    MenuComponent],
  imports: [
    CommonModule,
    GamerRoutingModule,
    MatSelectModule,
    ReactiveFormsModule,
  ]
})
export class GamerModule { }

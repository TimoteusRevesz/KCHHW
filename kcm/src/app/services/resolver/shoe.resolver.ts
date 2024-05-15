import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ShoeService } from '../shoe.service';
import { Card } from 'src/app/models/card';

@Injectable({
  providedIn: 'root'
})
export class ShoeResolver implements Resolve<Card[]> {

  constructor(private shoeService: ShoeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Card[] {
    return this.shoeService.getAllCards();
  }
}

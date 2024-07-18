import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CacheService, CardListService } from '../../services';

@Component({
  selector: 'app-pokemon-dashboard',
  templateUrl: './pokemon-dashboard.component.html',
  styleUrls: ['./pokemon-dashboard.component.scss'],
})
export class PokemonDashboardComponent implements OnInit {
  cards$ = this.cardListService.cardList$;
  subscription = new Subscription();

  constructor(
    private cardListService: CardListService,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.subscription = this.cardListService.getCards().subscribe();
    // TODO add pagination or load more btn
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.cacheService.clearcache();
  }
}

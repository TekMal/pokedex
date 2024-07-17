import { Component, OnInit } from '@angular/core';

import { PokemonCard } from '../../models';
import { CacheService, CardListService } from '../../services';

@Component({
  selector: 'app-pokemon-dashboard',
  templateUrl: './pokemon-dashboard.component.html',
  styleUrls: ['./pokemon-dashboard.component.scss'],
})
export class PokemonDashboardComponent implements OnInit {
  initStateCards: PokemonCard[] = [];
  cards$ = this.cardListService.cardList$;

  constructor(
    private cardListService: CardListService,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.cardListService.getCards().subscribe((cards) => {
      this.initStateCards = cards;
    });
  }

  ngOnDestroy(): void {
    this.cacheService.clearcache();
  }
}

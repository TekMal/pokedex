import { Component, OnInit } from '@angular/core';
import { combineLatest, map } from 'rxjs';

import {
  CacheService,
  CardListFilterService,
  CardListService,
} from '../../services';

@Component({
  selector: 'app-pokemon-dashboard',
  templateUrl: './pokemon-dashboard.component.html',
  styleUrls: ['./pokemon-dashboard.component.scss'],
})
export class PokemonDashboardComponent implements OnInit {
  cards$ = this.cardListService.cardList$;
  showNoDataDisclaimer$ = this.cardListFilterService.showNoDataDisclaimer;

  isLoading$ = combineLatest([this.cards$, this.showNoDataDisclaimer$]).pipe(
    map(([cardList, showDisclaimer]) => !cardList.length && !showDisclaimer)
  );
  loaded$ = combineLatest([this.cards$, this.showNoDataDisclaimer$]).pipe(
    map(([cardList, showDisclaimer]) => cardList.length || showDisclaimer)
  );

  constructor(
    private cardListService: CardListService,
    private cacheService: CacheService,
    private cardListFilterService: CardListFilterService
  ) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.cardListService.getCards().subscribe();
  }

  ngOnDestroy(): void {
    this.cacheService.clearcache();
  }
}

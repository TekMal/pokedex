import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { PokemonCard } from 'src/app/pokemon-dashboard/models';
import {
  CardListFilterService,
  CardListService,
  CardService,
  PAGE_SIZE,
  PaginationService,
} from 'src/app/pokemon-dashboard/services';
import { CardDialogComponent } from '../card-dialog/card-dialog.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  cardListPageData$ = this.paginationService.getCardListPageData$();

  showNoDataDisclaimer$ = this.cardListFilterService.showNoDataDisclaimer;
  totalItems$ = this.cardListService.cardListLenght$;
  currentPage$ = this.paginationService.currentPage$;
  pageSize = PAGE_SIZE;

  constructor(
    private cardListFilterService: CardListFilterService,
    private cardService: CardService,
    private cardListService: CardListService,
    private paginationService: PaginationService,
    public dialog: MatDialog
  ) {}

  openCardDialog(card: PokemonCard): void {
    const similarCards$ = this.cardService.getSimilarCards(card);
    this.dialog.open(CardDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: { card, similarCards$ },
    });
  }

  pageChanged(event: PageEvent) {
    this.paginationService.currentPage = event.pageIndex;
    this.cardListPageData$ = this.paginationService.getCardListPageData$();
  }
}

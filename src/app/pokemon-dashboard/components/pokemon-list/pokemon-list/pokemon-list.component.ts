import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  CardFilters,
  CardTypes,
  PokemonCard,
} from 'src/app/pokemon-dashboard/models';
import {
  CacheService,
  CardListFilterService,
  CardListService,
  CardService,
} from 'src/app/pokemon-dashboard/services';
import { CardDialogComponent } from '../../card-dialog/card-dialog.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  initStateCards: PokemonCard[] = [];
  selectedCard: PokemonCard | null = null;
  showNoDataDisclaimer$ = this.cardListFilterService.showNoDataDisclaimer;
  cards$ = this.cardListService.cardList$;

  // TODO add trackby

  constructor(
    private cardListService: CardListService,
    private cardListFilterService: CardListFilterService,
    private cacheService: CacheService,
    private cardService: CardService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.cardListService.getCards().subscribe((cards) => {
      this.initStateCards = cards;
    });
  }

  selectCard(card: PokemonCard): void {
    this.selectedCard = card;
  }

  ngOnDestroy(): void {
    this.cacheService.clearcache();
  }

  openCardDialog(card: PokemonCard) {
    const similarCards$ = this.cardService.getSimilarCards(card);
    this.dialog.open(CardDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: { card, similarCards$ },
    });
  }
}

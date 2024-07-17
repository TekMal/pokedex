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
  searchForm: FormGroup<CardFilters> = this.initForm();
  showNoDataDisclaimer$ = this.cardListFilterService.showNoDataDisclaimer;
  cards$ = this.cardListService.cardList$;
  supertypes$ = this.cardListService.getCardTypes(CardTypes.supertypes);
  subtypes$ = this.cardListService.getCardTypes(CardTypes.subtypes);
  types$ = this.cardListService.getCardTypes(CardTypes.types);
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

  initForm(): FormGroup<CardFilters> {
    return new FormGroup({
      supertype: new FormControl<string | null>(null),
      subtype: new FormControl<string | null>(null),
      type: new FormControl<string | null>(null),
    });
  }

  filterCardList() {
    const { supertype, type, subtype } = this.searchForm?.getRawValue();
    console.log(supertype, type, subtype);
    this.cardListFilterService.filterCachedData(supertype, type, subtype);
  }

  resetForm() {
    this.searchForm.reset();
    this.cardListService.cardList = this.initStateCards;
  }

  ngOnDestroy(): void {
    this.cacheService.clearcache();
  }

  openCardDialog(card: PokemonCard) {
    const similarCards$ = this.cardService.getSimilarCards(card);
    const dialogRef = this.dialog.open(CardDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: { card, similarCards$ },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  CardFilters,
  CardTypes,
  PokemonCard,
} from 'src/app/pokemon-dashboard/models';
import { CardListService } from 'src/app/pokemon-dashboard/services';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  cards: PokemonCard[] = [];
  selectedCard: PokemonCard | null = null;
  searchForm: FormGroup<CardFilters> = this.initForm();
  supertypes$ = this.cardListService.getCardTypes(CardTypes.supertypes);
  subtypes$ = this.cardListService.getCardTypes(CardTypes.subtypes);
  types$ = this.cardListService.getCardTypes(CardTypes.types);
  // TODO add trackby

  constructor(private cardListService: CardListService) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.cardListService.getCards(11).subscribe((cards) => {
      this.cards = cards;
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
  }
}

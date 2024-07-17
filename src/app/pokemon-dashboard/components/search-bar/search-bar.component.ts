import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { CardFilters, CardTypes, PokemonCard } from '../../models';
import { CardListFilterService, CardListService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Input() initStateCards: PokemonCard[] = [];

  searchForm: FormGroup<CardFilters> = this.initForm();

  supertypes$ = this.cardListService.getCardTypes(CardTypes.supertypes);
  subtypes$ = this.cardListService.getCardTypes(CardTypes.subtypes);
  types$ = this.cardListService.getCardTypes(CardTypes.types);

  constructor(
    private cardListService: CardListService,
    private cardListFilterService: CardListFilterService,
    public dialog: MatDialog
  ) {}

  initForm(): FormGroup<CardFilters> {
    return new FormGroup({
      supertype: new FormControl<string | null>(null),
      subtype: new FormControl<string | null>(null),
      type: new FormControl<string | null>(null),
    });
  }

  filterCardList(): void {
    const { supertype, type, subtype } = this.searchForm?.getRawValue();
    this.cardListFilterService.filterCachedData(supertype, type, subtype);
  }

  resetForm(): void {
    this.searchForm.reset();
    this.cardListService.cardList = this.initStateCards;
  }
}

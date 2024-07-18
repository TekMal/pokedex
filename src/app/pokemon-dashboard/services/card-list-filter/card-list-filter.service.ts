import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { PokemonCard } from '../../models';
import { CacheService } from '../cache/cache.service';
import { CardListService } from '../card-list/card-list.service';

@Injectable({
  providedIn: 'root',
})
export class CardListFilterService {
  showNoDataDisclaimerSubject = new BehaviorSubject<boolean>(false);
  constructor(
    private cacheService: CacheService,
    private cardListService: CardListService
  ) {}

  filterCachedData(
    supertype: string | null,
    type: string | null,
    subtype: string | null
  ): void {
    const filteredCardArray = this.cacheService.cachedCardList?.filter(
      (card: PokemonCard) => {
        return (
          (!supertype ? !supertype : card.supertype === supertype) &&
          this.typesTableContainsElement(card.types, type) &&
          this.typesTableContainsElement(card.subtypes, subtype)
        );
      }
    );
    if (filteredCardArray) {
      this.showNoDataDisclaimerSubject.next(!filteredCardArray.length);
      this.cardListService.cardList = filteredCardArray;
    }
  }

  typesTableContainsElement(
    typesTable: string[],
    element: string | null
  ): boolean {
    return !element ? !element : typesTable.includes(element);
  }

  get showNoDataDisclaimer(): Observable<boolean> {
    return this.showNoDataDisclaimerSubject.asObservable();
  }
}

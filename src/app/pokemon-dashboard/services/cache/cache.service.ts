import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardTypes, PokemonCard } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  cachedCardTypes = {
    supertypes: new BehaviorSubject<string[] | null>(null),
    subtypes: new BehaviorSubject<string[] | null>(null),
    types: new BehaviorSubject<string[] | null>(null),
  };

  cachedCardsList = new BehaviorSubject<PokemonCard[] | null>(null);

  setCardTypesCache(typeKey: CardTypes, typesList: string[]): void {
    this.cachedCardTypes[typeKey].next(typesList);
  }

  getCachedCardTypes(typeKey: CardTypes): string[] | null {
    return this.cachedCardTypes[typeKey].value;
  }

  set cardListCache(givenCardsList: PokemonCard[]) {
    this.cachedCardsList.next(givenCardsList);
  }

  get cachedCardList(): PokemonCard[] | null {
    return this.cachedCardsList.value;
  }

  clearcache(): void {
    this.cachedCardsList.next(null);
    [CardTypes.supertypes, CardTypes.subtypes, CardTypes.types].forEach(
      (key: CardTypes) => this.cachedCardTypes[key].next(null)
    );
  }
}

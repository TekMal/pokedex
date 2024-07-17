import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CacheService, CardListService } from '..';
import { PokemonCard } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  cards$ = this.cardListService.cardList$;

  constructor(
    private cardListService: CardListService,
    private cacheService: CacheService
  ) {}

  getSimilarCards(card: PokemonCard): Observable<PokemonCard[] | null> {
    return this.cards$.pipe(
      map((cards: PokemonCard[] | null) =>
        this.checkCardSubtypes(card.subtypes, card.id, cards)
      )
    );
  }

  checkCardSubtypes(
    givenCardSubtypes: string[],
    givenCardId: string,
    cardsToCheck: PokemonCard[] | null
  ): PokemonCard[] | null {
    if (cardsToCheck) {
      const anySimilarSubtypes: PokemonCard[] = cardsToCheck.filter(
        (cardToCheck: PokemonCard) =>
          cardToCheck.subtypes.some((subtypes) =>
            givenCardSubtypes.includes(subtypes)
          ) && cardToCheck.id !== givenCardId
      );
      return anySimilarSubtypes;
    } else {
      return null;
    }
  }

  editCard(
    cardId: string,
    changes: {
      supertype: string;
      type: string;
      subtype: string;
      hitPoints: string;
    }
  ) {
    // TODO refactor list of card object to object => [cardId: string]: {...cardData}
    const { supertype, type, subtype, hitPoints } = changes;
    const updatedCardList = this.cacheService.cachedCardList?.map(
      (card: PokemonCard) => {
        if (card.id === cardId) {
          return {
            ...card,
            supertype,
            types: [type],
            subtypes: [subtype],
            hp: hitPoints,
          };
        } else return card;
      }
    );
    if (updatedCardList) {
      this.cardListService.cardList = updatedCardList;
      this.cacheService.cardListCache = updatedCardList;
    }
    console.log(updatedCardList);
  }
}

import { Injectable } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { CardListService } from '..';
import { CardTypes, PokemonCard } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  cards$ = this.cardListService.cardList$;

  constructor(private cardListService: CardListService) {}

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
}

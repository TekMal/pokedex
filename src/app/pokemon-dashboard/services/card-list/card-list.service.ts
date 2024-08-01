import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
  CardTypes,
  PokemonCard,
  PokemonCardsDTO,
  PokemonCardTypesDTO,
} from '../../models';
import { CacheService } from '../cache/cache.service';

export const CARD_AMOUNT = 200;

@Injectable({
  providedIn: 'root',
})
export class CardListService {
  cardListSubject = new BehaviorSubject<PokemonCard[]>([]);

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getCards(): Observable<PokemonCard[]> {
    const cachedCards = this.cacheService.cachedCardList;

    if (cachedCards) {
      return of(cachedCards);
    } else {
      const params = new HttpParams().set('pageSize', CARD_AMOUNT);

      return this.http
        .get<PokemonCardsDTO>(`${environment.apiUrl}/cards`, {
          params,
        })
        .pipe(
          map((data: PokemonCardsDTO) => data.data),
          tap((data: PokemonCard[]) => {
            this.cardList = data;
            this.cacheService.cardListCache = data;
          }),
          catchError((err: HttpErrorResponse) => {
            throw 'Cards get error message: ' + err.message;
          })
        );
    }
  }

  getCardTypes(typeOfCardTypes: CardTypes): Observable<string[]> {
    const cachedCardType =
      this.cacheService.getCachedCardTypes(typeOfCardTypes);

    if (cachedCardType) {
      return of(cachedCardType);
    } else {
      return this.http
        .get<PokemonCardTypesDTO>(
          `${environment.apiUrl}/${typeOfCardTypes}`,
          {}
        )
        .pipe(
          map((data: PokemonCardTypesDTO) => data.data),
          tap((data: string[]) => {
            this.cacheService.setCardTypesCache(typeOfCardTypes, data);
          }),
          catchError((err: HttpErrorResponse) => {
            throw 'Cards types get error message: ' + err.message;
          })
        );
    }
  }

  get cardList$(): Observable<PokemonCard[]> {
    return this.cardListSubject.asObservable();
  }

  set cardList(value: PokemonCard[]) {
    this.cardListSubject.next(value);
  }

  get cardListLenght$(): Observable<number> {
    return this.cardList$.pipe(map((cardList) => cardList.length));
  }
}

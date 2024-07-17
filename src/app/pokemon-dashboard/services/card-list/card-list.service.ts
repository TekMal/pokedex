import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import {
  CardTypes,
  PokemonCard,
  PokemonCardsDTO,
  PokemonCardTypesDTO,
} from '../../models';
import { environment } from 'src/environments/environment';
import { CacheService } from '../cache/cache.service';

const CARD_AMOUNT = 20;

@Injectable({
  providedIn: 'root',
})
export class CardListService {
  cardListSubject = new BehaviorSubject<PokemonCard[] | null>(null);

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getCards(): Observable<PokemonCard[]> {
    const cachedCards = this.cacheService.cachedCardList;
    console.log(cachedCards);

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
            // TODO improve error handling / add error message for the user
          })
        );
    }
  }

  getCardTypes(typeOfCardTypes: CardTypes): Observable<string[]> {
    return this.http
      .get<PokemonCardTypesDTO>(`${environment.apiUrl}/${typeOfCardTypes}`, {})
      .pipe(
        map((data: PokemonCardTypesDTO) => data.data),
        catchError((err: HttpErrorResponse) => {
          throw 'Cards types get error message: ' + err.message;
        })
      );
  }

  get cardList$(): Observable<PokemonCard[] | null> {
    return this.cardListSubject.asObservable();
  }

  set cardList(value: PokemonCard[] | null) {
    this.cardListSubject.next(value);
  }
}

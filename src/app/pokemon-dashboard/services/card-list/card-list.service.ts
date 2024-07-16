import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import {
  CardTypes,
  PokemonCard,
  PokemonCardsDTO,
  PokemonCardTypesDTO,
} from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CardListService {
  constructor(private http: HttpClient) {}

  getCards(cardsAmount: number): Observable<PokemonCard[]> {
    const params = new HttpParams().set('pageSize', cardsAmount);

    return this.http
      .get<PokemonCardsDTO>(`${environment.apiUrl}/cards`, {
        params,
      })
      .pipe(
        map((data: PokemonCardsDTO) => data.data),
        catchError((err: HttpErrorResponse) => {
          throw 'Cards get error message: ' + err.message;
          // TODO improve error handling / add error message for the user
        })
      );
  }

  // typeOfType <3

  getCardTypes(typeOfType: CardTypes): Observable<string[]> {
    return this.http
      .get<PokemonCardTypesDTO>(`${environment.apiUrl}/${typeOfType}`, {})
      .pipe(
        map((data: PokemonCardTypesDTO) => data.data),
        catchError((err: HttpErrorResponse) => {
          throw 'Cards types get error message: ' + err.message;
        })
      );
  }
}

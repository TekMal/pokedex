import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PokemonCard, PokemonCardsDTO } from '../../models';
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
      .pipe(map((data: PokemonCardsDTO) => data.data));
  }
}

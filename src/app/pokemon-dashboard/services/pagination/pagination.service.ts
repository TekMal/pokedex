import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { PokemonCard } from '../../models';
import { CardListService } from '../card-list/card-list.service';

export const PAGE_SIZE = 20;

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  currentPageSubject = new BehaviorSubject<number>(0);

  constructor(private cardListService: CardListService) {}

  get currentPage$(): Observable<number> {
    return this.currentPageSubject.asObservable();
  }

  set currentPage(value: number) {
    this.currentPageSubject.next(value);
  }

  getCardListPageData$(): Observable<PokemonCard[]> {
    const currentPage = this.currentPageSubject.value;
    const sliceStart = currentPage * PAGE_SIZE;
    const slicetEnd = currentPage * PAGE_SIZE + PAGE_SIZE;

    return this.cardListService.cardList$.pipe(
      map((cardList) => {
        return cardList.length < slicetEnd
          ? cardList.slice(sliceStart, cardList.length)
          : cardList.slice(sliceStart, slicetEnd);
      })
    );
  }
}

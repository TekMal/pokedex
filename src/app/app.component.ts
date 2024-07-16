import { Component } from '@angular/core';
import { CardListService } from './pokemon-dashboard/services/card-list/card-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pokedex';
  constructor(private cardListService: CardListService) {
    this.cardListService.getCards(6).subscribe((cards) => {
      console.log(cards);
    });
  }
}

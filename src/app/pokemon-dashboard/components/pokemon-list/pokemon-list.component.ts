import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PokemonCard } from 'src/app/pokemon-dashboard/models';
import {
  CardListFilterService,
  CardService,
} from 'src/app/pokemon-dashboard/services';
import { CardDialogComponent } from '../card-dialog/card-dialog.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  @Input() cards: PokemonCard[] | null = null;

  selectedCard: PokemonCard | null = null;
  showNoDataDisclaimer$ = this.cardListFilterService.showNoDataDisclaimer;

  constructor(
    private cardListFilterService: CardListFilterService,
    private cardService: CardService,
    public dialog: MatDialog
  ) {}

  selectCard(card: PokemonCard): void {
    this.selectedCard = card;
  }

  openCardDialog(card: PokemonCard) {
    const similarCards$ = this.cardService.getSimilarCards(card);
    this.dialog.open(CardDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: { card, similarCards$ },
    });
  }
}

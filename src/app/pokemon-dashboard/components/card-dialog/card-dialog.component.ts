import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { PokemonCard } from '../../models';
import { CardService } from '../../services';
import { EditCardDialogComponent } from '../edit-card-dialog/edit-card-dialog.component';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.scss'],
})
export class CardDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CardDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      card: PokemonCard;
      similarCards$: Observable<PokemonCard[] | null>;
    },
    public dialog: MatDialog,
    private cardService: CardService
  ) {}

  openCardDialog(card: PokemonCard): void {
    const similarCards$ = this.cardService.getSimilarCards(card);
    this.dialogRef.close();
    this.dialog.open(CardDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: { card, similarCards$ },
    });
  }

  openEditCardDialog(card: PokemonCard): void {
    const editDialogRef = this.dialog.open(EditCardDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: { card },
    });
    editDialogRef.afterClosed().subscribe((changed: boolean) => {
      if (changed) {
        this.dialogRef.close();
      }
    });
  }
}

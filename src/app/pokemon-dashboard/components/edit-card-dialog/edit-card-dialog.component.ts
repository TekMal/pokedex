import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { CardTypes, PokemonCard } from '../../models';
import { CardListService, CardService } from '../../services';

@Component({
  selector: 'app-edit-card-dialog',
  templateUrl: './edit-card-dialog.component.html',
  styleUrls: ['./edit-card-dialog.component.scss'],
})
export class EditCardDialogComponent {
  isNumberHintVisible = false;
  editForm = new FormGroup({
    supertype: new FormControl<string>(
      this.data.card.supertype,
      Validators.required
    ),
    subtype: new FormControl<string>(
      this.data.card.subtypes[0],
      Validators.required
    ),
    type: new FormControl<string>(this.data.card.types[0], Validators.required),
    hitPoints: new FormControl<string>(this.data.card.hp, Validators.required),
  });

  // TODO handle null and init data in form controls

  supertypes$ = this.cardListService.getCardTypes(CardTypes.supertypes);
  subtypes$ = this.cardListService.getCardTypes(CardTypes.subtypes);
  types$ = this.cardListService.getCardTypes(CardTypes.types);

  constructor(
    public dialogRef: MatDialogRef<EditCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      card: PokemonCard;
    },
    public dialog: MatDialog,
    private cardService: CardService,
    private cardListService: CardListService
  ) {}

  editCard(): void {
    const { supertype, type, subtype, hitPoints } =
      this.editForm?.getRawValue();
    this.cardService.editCard(this.data.card.id, {
      supertype: supertype ? supertype : this.data.card.supertype,
      type: type ? type : this.data.card.types[0],
      subtype: subtype ? subtype : this.data.card.subtypes[0],
      hitPoints: hitPoints ? hitPoints : this.data.card.hp,
    });
    this.dialogRef.close(true);
  }

  isItNumber(event: KeyboardEvent): boolean {
    this.isNumberHintVisible = this.isEventNotNumberOrEnter(event);
    return !this.isNumberHintVisible;
  }

  onFocus(): void {
    this.isNumberHintVisible = false;
  }

  isEventNotNumberOrEnter(event: KeyboardEvent): boolean {
    const { key } = event;
    return !/[0-9]/.test(key) && key !== 'Enter';
  }
}

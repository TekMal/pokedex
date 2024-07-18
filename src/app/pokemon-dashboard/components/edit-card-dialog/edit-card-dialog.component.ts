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
  supertypes$ = this.cardListService.getCardTypes(CardTypes.supertypes);
  subtypes$ = this.cardListService.getCardTypes(CardTypes.subtypes);
  types$ = this.cardListService.getCardTypes(CardTypes.types);

  isNumberHintVisible = false;
  editForm = new FormGroup({
    supertypeEdit: new FormControl<string>(
      this.data.card.supertype,
      Validators.required
    ),
    subtypeEdit: new FormControl<string>(
      this.data.card.subtypes[0],
      Validators.required
    ),
    typeEdit: new FormControl<string>(
      this.data.card.types[0],
      Validators.required
    ),
    hitPointsEdit: new FormControl<string>(
      this.data.card.hp,
      Validators.required
    ),
  });

  // TODO handle null and init data in form controls

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
    const { supertypeEdit, typeEdit, subtypeEdit, hitPointsEdit } =
      this.editForm?.getRawValue();
    const { supertype, types, subtypes, hp, id } = this.data.card;
    this.cardService.editCard(id, {
      supertype: supertypeEdit ? supertypeEdit : supertype,
      type: typeEdit ? typeEdit : types[0],
      subtype: subtypeEdit ? subtypeEdit : subtypes[0],
      hitPoints: hitPointsEdit ? hitPointsEdit : hp,
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

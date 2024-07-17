import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CardTypes } from '../../models';
import { CardListService } from '../../services';

@Component({
  selector: 'app-edit-card-dialog',
  templateUrl: './edit-card-dialog.component.html',
  styleUrls: ['./edit-card-dialog.component.scss'],
})
export class EditCardDialogComponent {
  editForm = new FormGroup({
    supertype: new FormControl<string | null>(null),
    subtype: new FormControl<string | null>(null),
    type: new FormControl<string | null>(null),
    hitPoints: new FormControl<string | null>(null),
  });

  supertypes$ = this.cardListService.getCardTypes(CardTypes.supertypes);
  subtypes$ = this.cardListService.getCardTypes(CardTypes.subtypes);
  types$ = this.cardListService.getCardTypes(CardTypes.types);

  constructor(private cardListService: CardListService) {}
  editCard() {}
}

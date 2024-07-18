import { FormControl } from '@angular/forms';

type StringFormControl = FormControl<string | null>;

export interface CardFilters {
  supertype: StringFormControl;
  subtype: StringFormControl;
  type: StringFormControl;
}

export interface CardEdit {
  supertypeEdit: StringFormControl;
  subtypeEdit: StringFormControl;
  typeEdit: StringFormControl;
  hitPointsEdit: StringFormControl;
}

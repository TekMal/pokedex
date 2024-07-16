import { FormControl } from '@angular/forms';

type StringFormControl = FormControl<string | null>;

export interface CardFilters {
  supertype: StringFormControl;
  subtype: StringFormControl;
  type: StringFormControl;
}

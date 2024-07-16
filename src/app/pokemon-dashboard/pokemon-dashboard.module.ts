import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { PokemonDashboardRoutingModule } from './pokemon-dashboard-routing.module';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list/pokemon-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PokemonDashboardComponent } from './components/pokemon-dashboard/pokemon-dashboard.component';

const materialModules = [
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
];

@NgModule({
  declarations: [PokemonListComponent, PokemonDashboardComponent],
  imports: [
    CommonModule,
    PokemonDashboardRoutingModule,
    ReactiveFormsModule,
    ...materialModules,
  ],
})
export class PokemonDashboardModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDashboardComponent } from './components/pokemon-dashboard/pokemon-dashboard.component';

const routes: Routes = [{ path: '', component: PokemonDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonDashboardRoutingModule {}

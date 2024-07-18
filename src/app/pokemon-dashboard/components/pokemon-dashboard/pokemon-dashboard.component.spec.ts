import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PokemonDashboardComponent } from './pokemon-dashboard.component';

describe('PokemonDashboardComponent', () => {
  let component: PokemonDashboardComponent;
  let fixture: ComponentFixture<PokemonDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatProgressSpinnerModule],
      declarations: [PokemonDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EditCardDialogComponent } from './edit-card-dialog.component';

describe('EditCardDialogComponent', () => {
  let component: EditCardDialogComponent;
  let fixture: ComponentFixture<EditCardDialogComponent>;

  const mockDialogRef = {
    close: () => {},
  };
  const mockDialogData = {
    card: {
      id: 'swsh4-25',
      name: 'Charizard',
      supertype: 'Pokémon',
      subtypes: ['Stage 2'],
      hp: '170',
      types: ['Fire'],
      evolvesFrom: 'Charmeleon',
      abilities: [
        {
          name: 'Battle Sense',
          text: 'Once during your turn, you may look at the top 3 cards of your deck and put 1 of them into your hand. Discard the other cards.',
          type: 'Ability',
        },
      ],
      attacks: [
        {
          name: 'Royal Blaze',
          cost: ['Fire', 'Fire'],
          convertedEnergyCost: 2,
          damage: '100+',
          text: 'This attack does 50 more damage for each Leon card in your discard pile.',
        },
      ],
      weaknesses: [
        {
          type: 'Water',
          value: '×2',
        },
      ],
      retreatCost: ['Colorless', 'Colorless', 'Colorless'],
      convertedRetreatCost: 3,
      set: {
        id: 'swsh4',
        name: 'Vivid Voltage',
        series: 'Sword & Shield',
        printedTotal: 185,
        total: 203,
        legalities: {
          unlimited: 'Legal',
          standard: 'Legal',
          expanded: 'Legal',
        },
        ptcgoCode: 'VIV',
        releaseDate: '2020/11/13',
        updatedAt: '2020/11/13 16:20:00',
        images: {
          symbol: 'https://images.pokemontcg.io/swsh4/symbol.png',
          logo: 'https://images.pokemontcg.io/swsh4/logo.png',
        },
      },
      number: '25',
      artist: 'Ryuta Fuse',
      rarity: 'Rare',
      flavorText:
        'It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.',
      nationalPokedexNumbers: [6],
      legalities: {
        unlimited: 'Legal',
        standard: 'Legal',
        expanded: 'Legal',
      },
      images: {
        small: 'https://images.pokemontcg.io/swsh4/25.png',
        large: 'https://images.pokemontcg.io/swsh4/25_hires.png',
      },
      tcgplayer: {
        url: 'https://prices.pokemontcg.io/tcgplayer/swsh4-25',
        updatedAt: '2021/08/04',
        prices: {
          normal: {
            low: 1.73,
            mid: 3.54,
            high: 12.99,
            market: 2.82,
            directLow: 3.93,
          },
          reverseHolofoil: {
            low: 3,
            mid: 8.99,
            high: 100,
            market: 3.89,
            directLow: 4.46,
          },
        },
      },
      cardmarket: {
        url: 'https://prices.pokemontcg.io/cardmarket/swsh4-25',
        updatedAt: '2021/08/04',
        prices: {
          averageSellPrice: 9.38,
          lowPrice: 8.95,
          trendPrice: 10.29,
          germanProLow: null,
          suggestedPrice: null,
          reverseHoloSell: null,
          reverseHoloLow: null,
          reverseHoloTrend: null,
          lowPriceExPlus: 8.95,
          avg1: 9.95,
          avg7: 9.35,
          avg30: 11.31,
          reverseHoloAvg1: null,
          reverseHoloAvg7: null,
          reverseHoloAvg30: null,
        },
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [EditCardDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

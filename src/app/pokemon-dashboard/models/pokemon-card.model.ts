export interface PokemonCardDTO {
  data: PokemonCard;
}

export interface PokemonCard {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  level: string;
  hp: string;
  types: string[];
  evolvesFrom: string;
  evolvesTo: string[];
  rules: string[];
  ancientTrait: AncientTrait;
  abilities: Abilities[];
  attacks: Attacks[];
  weaknesses: Weaknesses[];
  resistances: Resistances[];
  retreatCost: string[];
  convertedRetreatCost: number;
  set: Set;
  number: string;
  artist: string;
  rarity: string;
  flavorText: string;
  nationalPokedexNumbers: number[];
  legalities: Legalities;
  regulationMark: string;
  images: {
    small: string;
    large: string;
  };
  tcgplayer: Tcgplayer;
  cardmarket: CardMarket;
}

export interface AncientTrait {
  name: string;
  text: string;
}

export interface Abilities {
  name: string;
  text: string;
  type: string;
}

export interface Attacks {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

export interface Weaknesses {
  type: string;
  value: string;
}

export interface Resistances {
  type: string;
  value: string;
}

export interface Set {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: {
    symbol: string;
    logo: string;
  };
}

export interface Legalities {
  [format: string]: string;
}

export interface Tcgplayer {
  url: string;
  updatedAt: string;
  prices: {
    holofoil: {
      low: number;
      mid: number;
      high: number;
      market: number;
      directLow: number;
    };
    reverseHolofoil: {
      low: number;
      mid: number;
      high: number;
      market: number;
      directLow: number;
    };
    normal: {
      low: number;
      mid: number;
      high: number;
      market: number;
      directLow: number;
    };
    [rarity: string]: {
      low: number;
      mid: number;
      high: number;
      market: number;
      directLow: number;
    };
  };
}

export interface CardMarket {
  url: string;
  updatedAt: string;
  prices: {
    averageSellPrice: number;
    lowPrice: number;
    trendPrice: number;
    germanProLow: number;
    suggestedPrice: number;
    reverseHoloSell: number;
    reverseHoloLow: number;
    reverseHoloTrend: number;
    lowPriceExPlus: number;
    avg1: number;
    avg7: number;
    avg30: number;
    reverseHoloAvg1: number;
    reverseHoloAvg7: number;
    reverseHoloAvg30: number;
  };
}

export enum CardTypes {
  supertypes = 'supertypes',
  subtypes = 'subtypes',
  types = 'types',
}

export interface PokemonCardTypesDTO {
  data: string[];
}

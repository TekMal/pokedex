import { PokemonCard } from './pokemon-card.model';

export interface PokemonCardsDTO {
  count: number;
  data: PokemonCard[];
  page: number;
  pageSize: number;
  totalCount: number;
}

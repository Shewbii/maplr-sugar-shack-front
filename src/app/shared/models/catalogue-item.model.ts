export interface CatalogueItem {
  id: number;
  name: string;
  image: string;
  price: number;
  maxQty: number;
  type: 'AMBER' | 'DARK' | 'CLEAR';
}

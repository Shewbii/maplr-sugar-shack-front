export interface MapleSyrup {
  id: number;
  description: string;
  image: string;
  price: number;
  stock: number;
  type: 'AMBER' | 'DARK' | 'CLEAR';
}

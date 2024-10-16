export interface MapleSyrup {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  type: 'AMBER' | 'DARK' | 'CLEAR';
}

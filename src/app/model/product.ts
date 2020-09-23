export interface Product {
  key: string;
  value: {
    id: number;
    name: string;
    price: number;
    amount: number;
    category: string;
    imageUrl: string;
    description: string;
    isFavorite: boolean;
  };
}

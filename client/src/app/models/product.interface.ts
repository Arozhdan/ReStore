export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  brand: string;
  type?: string;
  quantityInStock?: number;
}

export interface IProductParams {
  orderBy: string;
  brands?: string[];
  types?: string[];
  searchTerm?: string;
  pageNumber: number;
  pageSize: number;
}

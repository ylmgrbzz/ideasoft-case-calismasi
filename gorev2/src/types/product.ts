export interface Product {
  id: number;
  name: string;
  sku: string;
  barcode?: string;
  stockAmount: number;
  price1: number;
  currency: {
    id: number;
    label: string;
    abbr: string;
  };
  status: 0 | 1;
  shortDetails?: string;
  tax?: number;
  brand?: {
    id: number;
    name: string;
  };
  categories?: {
    id: number;
    name: string;
  }[];
}

export interface CreateProductRequest {
  name: string;
  sku: string;
  barcode?: string;
  stockAmount: number;
  price1: number;
  currency: {
    id: number;
  };
  status: 0 | 1;
  shortDetails?: string;
  tax?: number;
  brand?: {
    id: number;
  };
  categories?: {
    id: number;
  }[];
}

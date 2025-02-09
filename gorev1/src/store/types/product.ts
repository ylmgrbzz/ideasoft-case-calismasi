export interface Product {
  id: number;
  name: string;
  sku: string;
  brand?: string;
  distributor?: string;
  stockAmount?: number;
  // Diğer ürün alanları buraya eklenecek
}

export interface ProductQueryParams {
  brand?: string;
  distributor?: string;
  endDate?: string;
  endUpdatedAt?: string;
  ids?: string;
  limit?: number;
  name?: string;
  page?: number;
  parent?: string;
  q?: string;
  sinceId?: number;
  sku?: string;
  sort?: string;
  startDate?: string;
  startUpdatedAt?: string;
  stockAmount?: string;
}

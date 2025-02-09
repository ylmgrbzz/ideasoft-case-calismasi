export interface Currency {
  id: number;
  label: string;
  abbr: string;
}

export interface ProductImage {
  id: number;
  filename: string;
  extension: string;
  directoryName: string;
  revision: string;
  sortOrder: number;
}

export interface ProductCategory {
  id: number;
  name: string;
  distributorCode: string;
}

export interface ProductToCategory {
  id: number;
  sortOrder: number | null;
  category: ProductCategory;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  fullName: string;
  sku: string;
  barcode: string | null;
  price1: number;
  warranty: number;
  tax: number;
  stockAmount: number;
  volumetricWeight: number;
  buyingPrice: number;
  stockTypeLabel: string;
  discount: number;
  discountType: number;
  moneyOrderDiscount: number;
  status: number;
  taxIncluded: number;
  distributor: string | null;
  isGifted: number;
  gift: string | null;
  customShippingDisabled: number;
  customShippingCost: number;
  marketPriceDetail: string | null;
  createdAt: string;
  updatedAt: string;
  metaKeywords: string;
  metaDescription: string;
  pageTitle: string;
  hasOption: number;
  shortDetails: string;
  searchKeywords: string;
  installmentThreshold: string;
  homeSortOrder: number | null;
  popularSortOrder: number | null;
  brandSortOrder: number | null;
  featuredSortOrder: number | null;
  campaignedSortOrder: number | null;
  newSortOrder: number | null;
  discountedSortOrder: number | null;
  brand: string | null;
  currency: Currency;
  parent: string | null;
  countdown: string | null;
  prices: any[];
  images: ProductImage[];
  details: any[];
  productToCategories: ProductToCategory[];
  productExtraFields: any[];
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

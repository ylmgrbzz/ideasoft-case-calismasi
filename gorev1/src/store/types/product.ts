export interface Currency {
  id: number;
  label: string;
  buyingPrice: number;
  sellingPrice: number;
  abbr: string;
  updatedAt: string;
  status: number;
  permissionStatus: number;
  isPrimary: number;
  isEffective: number;
  isExtra: number;
}

export interface ProductImage {
  id: number;
  filename: string;
  extension: string;
  directoryName: string;
  revision: string;
  sortOrder: number;
  attachment?: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  sortOrder: number;
  status: number;
  distributorCode: string;
  distributor: string;
  imageFile: string;
  showcaseContent: string;
  displayShowcaseContent: number;
  showcaseFooterContent: string;
  displayShowcaseFooterContent: number;
  metaKeywords: string;
  metaDescription: string;
  canonicalUrl: string;
  pageTitle: string;
  attachment?: string;
  isSearchable: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  sortOrder: number;
  status: number;
  distributorCode: string;
  percent: number;
  imageFile: string;
  distributor: string;
  displayShowcaseContent: number;
  showcaseContent: string;
  showcaseContentDisplayType: number;
  displayShowcaseFooterContent: number;
  showcaseFooterContent: string;
  showcaseFooterContentDisplayType: number;
  hasChildren: number;
  metaKeywords: string;
  metaDescription: string;
  canonicalUrl: string;
  pageTitle: string;
  leftIndex: number;
  level: number;
  rightIndex: number;
  root: number;
  isCombine: number;
  isSearchable: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductToCategory {
  id: number;
  sortOrder: number | null;
  category: Category;
}

export interface ProductDetail {
  id: number;
  sku: string;
  details: string;
  extraDetails?: string;
}

export interface ProductExtraField {
  id: number;
  varKey: string;
  varValue: string;
}

export interface Countdown {
  id: number;
  startDate: string;
  endDate: string;
  expireDate: string;
  useCountDown: number;
}

export interface Price {
  id: number;
  value: number;
  type: number;
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
  brand: Brand | null;
  currency: Currency;
  parent: Partial<Product> | null;
  countdown: Countdown | null;
  prices: Price[];
  images: ProductImage[];
  details: ProductDetail[];
  productToCategories: ProductToCategory[];
  productExtraFields: ProductExtraField[];
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

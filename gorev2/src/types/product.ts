export interface Product {
  id: number;
  name: string;
  fullName: string;
  slug: string;
  sku: string;
  barcode?: string;
  stockAmount: number;
  price1: number;
  currency: {
    id: number;
    label: string;
    abbr: string;
  };
  discount: number;
  discountType: 0 | 1;
  moneyOrderDiscount: number;
  buyingPrice: number;
  marketPriceDetail?: string;
  taxIncluded: 0 | 1;
  tax: number;
  warranty: number;
  volumetricWeight: number;
  stockTypeLabel:
    | "Piece"
    | "cm"
    | "Dozen"
    | "gram"
    | "kg"
    | "Person"
    | "Package"
    | "metre"
    | "m2"
    | "pair";
  customShippingDisabled: 0 | 1;
  customShippingCost: number;
  distributor?: string;
  hasGift: 0 | 1;
  gift?: string;
  status: 0 | 1;
  hasOption: 0 | 1;
  shortDetails?: string;
  installmentThreshold: string;
  homeSortOrder?: number;
  popularSortOrder?: number;
  brandSortOrder?: number;
  featuredSortOrder?: number;
  campaignedSortOrder?: number;
  newSortOrder?: number;
  discountedSortOrder?: number;
  categoryShowcaseStatus: 0 | 1;
  midblockSortOrder?: number;
  pageTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  brand?: {
    id: number;
    name: string;
    slug?: string;
    status: 0 | 1;
    sortOrder: number;
    distributorCode?: string;
    distributor?: string;
    imageFile?: string;
    imageUrl?: string;
  };
  categories?: {
    id: number;
    name: string;
    sortOrder: number;
    showcaseSortOrder?: number;
    pageTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    canonicalUrl?: string;
    tree: string;
    imageUrl?: string;
  }[];
  images?: {
    id: number;
    filename: string;
    extension: string;
    thumbUrl: string;
    originalUrl: string;
  }[];
  updatedAt: string;
  createdAt: string;
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
  discount?: number;
  discountType?: 0 | 1;
  moneyOrderDiscount?: number;
  buyingPrice?: number;
  marketPriceDetail?: string;
  taxIncluded?: 0 | 1;
  tax?: number;
  warranty?: number;
  volumetricWeight?: number;
  stockTypeLabel?:
    | "Piece"
    | "cm"
    | "Dozen"
    | "gram"
    | "kg"
    | "Person"
    | "Package"
    | "metre"
    | "m2"
    | "pair";
  customShippingDisabled?: 0 | 1;
  customShippingCost?: number;
  distributor?: string;
  hasGift?: 0 | 1;
  gift?: string;
  status: 0 | 1;
  shortDetails?: string;
  installmentThreshold?: string;
  pageTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  brand?: {
    id: number;
  };
  categories?: {
    id: number;
  }[];
  images?: {
    filename: string;
    extension: string;
    attachment: string;
  }[];
}

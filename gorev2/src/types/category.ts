export interface Category {
  id: number;
  name: string;
  slug: string;
  sortOrder: number;
  status: 0 | 1;
  distributor: string | null;
  distributorCode: string | null;
  percent: number;
  imageFile: string | null;
  displayShowcaseContent: 0 | 1 | 2;
  showcaseContent: string | null;
  showcaseContentDisplayType: 1 | 2 | 3;
  displayShowcaseFooterContent: 0 | 1 | 2;
  showcaseFooterContent: string | null;
  showcaseFooterContentDisplayType: 1 | 2 | 3;
  hasChildren: 0 | 1;
  pageTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  canonicalUrl: string | null;
  parent: Category | null;
  children: Category[];
  imageUrl: string | null;
  isCombine: 0 | 1;
  isSearchable: 0 | 1;
  seoSetting: any | null;
  createdAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  sortOrder: number;
  status: 0 | 1;
  displayShowcaseContent: 0 | 1 | 2;
  showcaseContentDisplayType: 1 | 2 | 3;
  displayShowcaseFooterContent: 0 | 1 | 2;
  showcaseFooterContentDisplayType: 1 | 2 | 3;
  isCombine: 0 | 1;
  slug?: string;
  percent?: number;
  imageFile?: string;
  showcaseContent?: string;
  showcaseFooterContent?: string;
  pageTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  parent?: number;
}

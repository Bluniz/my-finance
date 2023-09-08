export interface CategoriesListParams {
  walletId?: string;
}

export interface CategoriesDeleteParams {
  categoryId?: string;
}

export interface CategoriesUpdateParams extends CategoriesDeleteParams {
  name?: string;
}

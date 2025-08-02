export class ProductCategoryDTO {

  constructor(data:Partial<ProductCategoryDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  code?: string|null;
  description?: string|null;

}

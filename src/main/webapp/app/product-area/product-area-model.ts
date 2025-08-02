export class ProductAreaDTO {

  constructor(data:Partial<ProductAreaDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  code?: string|null;
  description?: string|null;

}

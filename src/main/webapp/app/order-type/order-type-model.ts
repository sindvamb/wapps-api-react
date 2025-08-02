export class OrderTypeDTO {

  constructor(data:Partial<OrderTypeDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  code?: string|null;
  description?: string|null;

}

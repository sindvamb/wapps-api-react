export class OrderStatusDTO {

  constructor(data:Partial<OrderStatusDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  code?: string|null;
  description?: string|null;

}

export class OrderEmailDTO {

  constructor(data:Partial<OrderEmailDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  email?: string|null;
  order?: string|null;
  ticket?: string|null;

}

export class OrderPropertyDTO {

  constructor(data:Partial<OrderPropertyDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  value?: string|null;
  order?: string|null;

}

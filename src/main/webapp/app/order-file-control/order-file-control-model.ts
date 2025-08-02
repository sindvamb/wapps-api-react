export class OrderFileControlDTO {

  constructor(data:Partial<OrderFileControlDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  fileControl?: string|null;
  order?: string|null;

}

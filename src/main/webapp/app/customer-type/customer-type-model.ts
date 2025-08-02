export class CustomerTypeDTO {

  constructor(data:Partial<CustomerTypeDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  code?: string|null;
  description?: string|null;

}

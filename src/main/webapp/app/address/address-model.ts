export class AddressDTO {

  constructor(data:Partial<AddressDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  zipCode?: string|null;
  neighborhood?: string|null;
  addressLine1?: string|null;
  addressLine2?: string|null;
  complement?: string|null;
  number?: number|null;
  city?: string|null;
  district?: string|null;
  uf?: string|null;
  housing?: string|null;

}

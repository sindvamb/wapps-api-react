export class EquipamentDTO {

  constructor(data:Partial<EquipamentDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  name?: string|null;
  description?: string|null;
  voltage?: string|null;
  type?: string|null;
  weight?: string|null;
  customerId?: string|null;
  company?: string|null;

}

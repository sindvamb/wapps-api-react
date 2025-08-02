export class DependentDTO {

  constructor(data:Partial<DependentDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  name?: string|null;
  cpfCnpj?: string|null;
  email?: string|null;
  cellPhone?: string|null;
  type?: string|null;
  customer?: string|null;

}

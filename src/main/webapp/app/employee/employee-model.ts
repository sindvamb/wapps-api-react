export class EmployeeDTO {

  constructor(data:Partial<EmployeeDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  name?: string|null;
  cpfCnpj?: string|null;
  description?: string|null;
  cellPhone?: string|null;
  position?: string|null;
  isApprentice?: boolean|null;
  customerId?: string|null;
  address?: string|null;
  company?: string|null;

}

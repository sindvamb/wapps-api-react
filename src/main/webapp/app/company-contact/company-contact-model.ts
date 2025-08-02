export class CompanyContactDTO {

  constructor(data:Partial<CompanyContactDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  area?: string|null;
  name?: string|null;
  role?: string|null;
  corporateEmail?: string|null;
  phone?: string|null;
  corporateCellPhone?: string|null;
  personalCellPhone?: string|null;
  company?: string|null;

}

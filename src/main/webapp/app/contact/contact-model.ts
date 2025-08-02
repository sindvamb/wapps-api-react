export class ContactDTO {

  constructor(data:Partial<ContactDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  name?: string|null;
  cpfCnpj?: string|null;
  email?: string|null;
  phone?: string|null;
  cellPhone?: string|null;
  fax?: string|null;
  mainActivityCode?: string|null;
  economicActivity?: string|null;
  address?: string|null;

}

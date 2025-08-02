export class MenuDTO {

  constructor(data:Partial<MenuDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  name?: string|null;
  description?: string|null;
  company?: string|null;

}

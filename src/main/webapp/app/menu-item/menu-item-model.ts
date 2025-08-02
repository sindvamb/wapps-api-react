export class MenuItemDTO {

  constructor(data:Partial<MenuItemDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  name?: string|null;
  description?: string|null;
  quantity?: string|null;
  type?: string|null;
  gramish?: string|null;
  measuredUnit?: string|null;
  menu?: string|null;

}

export class RoleDTO {

  constructor(data:Partial<RoleDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  value?: string|null;
  description?: string|null;

}

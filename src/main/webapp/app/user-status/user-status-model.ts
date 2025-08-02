export class UserStatusDTO {

  constructor(data:Partial<UserStatusDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  code?: string|null;
  description?: string|null;

}

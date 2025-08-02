export class PasswordHistoryDTO {

  constructor(data:Partial<PasswordHistoryDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  oldPassword?: string|null;
  newPassword?: string|null;
  securityCode?: string|null;
  hasChanged?: boolean|null;
  creatorId?: string|null;
  modifierId?: string|null;
  deleterId?: string|null;
  isDeleted?: boolean|null;
  createdAt?: string|null;
  updatedAt?: string|null;
  deletedAt?: string|null;
  user?: string|null;

}

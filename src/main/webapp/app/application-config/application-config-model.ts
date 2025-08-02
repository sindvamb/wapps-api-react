export class ApplicationConfigDTO {

  constructor(data:Partial<ApplicationConfigDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  value?: string|null;
  description?: string|null;
  creatorId?: string|null;
  modifierId?: string|null;
  deleterId?: string|null;
  isDeleted?: boolean|null;
  createdAt?: string|null;
  updatedAt?: string|null;
  deletedAt?: string|null;

}

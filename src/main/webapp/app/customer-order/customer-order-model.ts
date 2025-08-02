export class CustomerOrderDTO {

  constructor(data:Partial<CustomerOrderDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  isWapps?: boolean|null;
  isPresidency?: boolean|null;
  isClient?: boolean|null;
  isDirector?: boolean|null;
  isManager?: boolean|null;
  creatorId?: string|null;
  modifierId?: string|null;
  deleterId?: string|null;
  isDeleted?: boolean|null;
  createdAt?: string|null;
  updatedAt?: string|null;
  deletedAt?: string|null;
  customer?: string|null;
  order?: string|null;

}

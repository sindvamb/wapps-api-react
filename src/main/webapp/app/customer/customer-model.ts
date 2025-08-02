export class CustomerDTO {

  constructor(data:Partial<CustomerDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  creatorId?: string|null;
  modifierId?: string|null;
  deleterId?: string|null;
  isDeleted?: boolean|null;
  createdAt?: string|null;
  updatedAt?: string|null;
  deletedAt?: string|null;
  companyId?: string|null;
  customerType?: string|null;
  partnerUnit?: string|null;
  user?: string|null;

}

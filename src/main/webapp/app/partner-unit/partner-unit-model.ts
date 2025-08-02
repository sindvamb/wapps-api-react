export class PartnerUnitDTO {

  constructor(data:Partial<PartnerUnitDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  name?: string|null;
  cpfCnpj?: string|null;
  email?: string|null;
  enabled?: boolean|null;
  creatorId?: string|null;
  modifierId?: string|null;
  deleterId?: string|null;
  isDeleted?: boolean|null;
  createdAt?: string|null;
  updatedAt?: string|null;
  deletedAt?: string|null;
  partner?: string|null;

}

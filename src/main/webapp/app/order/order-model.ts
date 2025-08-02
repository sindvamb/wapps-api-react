export class OrderDTO {

  constructor(data:Partial<OrderDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  description?: string|null;
  sigla?: string|null;
  protocol?: string|null;
  dueDate?: string|null;
  enabled?: boolean|null;
  orderIndex?: number|null;
  creatorId?: string|null;
  modifierId?: string|null;
  deleterId?: string|null;
  isDeleted?: boolean|null;
  createdAt?: string|null;
  updatedAt?: string|null;
  deletedAt?: string|null;
  orderStatus?: string|null;
  orderType?: string|null;
  partnerUnit?: string|null;
  productArea?: string|null;
  productCategory?: string|null;

}

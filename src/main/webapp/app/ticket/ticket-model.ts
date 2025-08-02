export class TicketDTO {

  constructor(data:Partial<TicketDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  solution?: string|null;
  dueDate?: string|null;
  active?: boolean|null;
  creatorId?: string|null;
  modifierId?: string|null;
  deleterId?: string|null;
  isDeleted?: boolean|null;
  createdAt?: string|null;
  updatedAt?: string|null;
  deletedAt?: string|null;
  customer?: string|null;
  order?: string|null;
  ticketStatus?: string|null;

}

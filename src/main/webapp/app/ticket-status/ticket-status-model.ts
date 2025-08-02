export class TicketStatusDTO {

  constructor(data:Partial<TicketStatusDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  code?: string|null;
  description?: string|null;

}

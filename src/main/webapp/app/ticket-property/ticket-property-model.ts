export class TicketPropertyDTO {

  constructor(data:Partial<TicketPropertyDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  value?: string|null;
  ticket?: string|null;

}

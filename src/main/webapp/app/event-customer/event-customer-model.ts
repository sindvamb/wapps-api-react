export class EventCustomerDTO {

  constructor(data:Partial<EventCustomerDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  type?: string|null;
  approved?: boolean|null;
  company?: string|null;
  customer?: string|null;
  event?: string|null;

}

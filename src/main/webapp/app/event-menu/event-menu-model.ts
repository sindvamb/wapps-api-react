export class EventMenuDTO {

  constructor(data:Partial<EventMenuDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  company?: string|null;
  eventCustomer?: string|null;
  menu?: string|null;

}

export class EventEmployeeDTO {

  constructor(data:Partial<EventEmployeeDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  company?: string|null;
  employee?: string|null;
  eventCustomer?: string|null;

}

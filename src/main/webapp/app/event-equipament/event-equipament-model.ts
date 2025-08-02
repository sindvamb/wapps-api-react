export class EventEquipamentDTO {

  constructor(data:Partial<EventEquipamentDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  company?: string|null;
  equipament?: string|null;
  eventCustomer?: string|null;

}

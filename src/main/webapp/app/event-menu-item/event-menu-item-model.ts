export class EventMenuItemDTO {

  constructor(data:Partial<EventMenuItemDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  company?: string|null;
  menuItem?: string|null;
  menu?: string|null;

}

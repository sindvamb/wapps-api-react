export class RegistrationRequestDTO {

  constructor(data:Partial<RegistrationRequestDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  approved?: boolean|null;
  reason?: string|null;
  protocol?: string|null;
  date?: string|null;
  user?: string|null;

}

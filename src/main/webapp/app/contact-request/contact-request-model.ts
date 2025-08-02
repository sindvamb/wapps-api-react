export class ContactRequestDTO {

  constructor(data:Partial<ContactRequestDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  subject?: string|null;
  profile?: string|null;
  message?: string|null;
  response?: string|null;
  hasViewd?: boolean|null;
  hasAnswered?: boolean|null;
  hasPendding?: boolean|null;
  answeredDate?: string|null;
  createdAt?: string|null;
  contact?: string|null;

}

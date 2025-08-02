export class EventDTO {

  constructor(data:Partial<EventDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  name?: string|null;
  placeRealization?: string|null;
  address?: string|null;
  description?: string|null;
  eventType?: string|null;
  city?: string|null;
  uf?: string|null;
  programing?: string|null;
  assemblyInstructions?: string|null;
  partyPaymentDate?: string|null;
  partyDate?: string|null;
  timeStart?: string|null;
  timeEnd?: string|null;
  tentValue?: string|null;
  circulatingValue?: string|null;
  creatorId?: string|null;
  modifierId?: string|null;
  deleterId?: string|null;
  isDeleted?: boolean|null;
  createdAt?: string|null;
  updatedAt?: string|null;
  deletedAt?: string|null;

}

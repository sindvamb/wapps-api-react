export class SpecialNeedsDTO {

  constructor(data:Partial<SpecialNeedsDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  description?: string|null;
  user?: string|null;

}

export class AccessControlDTO {

  constructor(data:Partial<AccessControlDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  userId?: string|null;
  userName?: string|null;
  connectionTime?: string|null;
  lastBeatTime?: string|null;
  dur?: string|null;
  ip?: string|null;
  city?: string|null;
  os?: string|null;
  device?: string|null;
  browser?: string|null;
  language?: string|null;
  engine?: string|null;
  requestUrl?: string|null;

}

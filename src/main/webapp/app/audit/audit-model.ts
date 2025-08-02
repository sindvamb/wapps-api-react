export class AuditDTO {

  constructor(data:Partial<AuditDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  tableName?: string|null;
  keyValues?: string|null;
  oldValues?: string|null;
  newValues?: string|null;
  ipAddress?: string|null;
  user?: string|null;

}

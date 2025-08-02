export class EfmigrationsHistoryDTO {

  constructor(data:Partial<EfmigrationsHistoryDTO>) {
    Object.assign(this, data);
  }

  migrationId?: string|null;
  productVersion?: string|null;

}

export class LoginHistoryDTO {

  constructor(data:Partial<LoginHistoryDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  isSuccess?: boolean|null;
  reason?: string|null;
  ipAddress?: string|null;
  date?: string|null;
  user?: string|null;

}

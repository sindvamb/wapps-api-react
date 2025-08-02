export class EmailHistoryDTO {

  constructor(data:Partial<EmailHistoryDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  userId?: string|null;
  isSuccess?: boolean|null;
  reason?: string|null;
  email?: string|null;
  templateKey?: string|null;
  data?: string|null;
  ipAddress?: string|null;
  messageId?: string|null;
  date?: string|null;

}

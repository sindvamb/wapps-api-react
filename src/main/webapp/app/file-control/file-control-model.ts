export class FileControlDTO {

  constructor(data:Partial<FileControlDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  fileName?: string|null;
  fileSize?: string|null;
  fileArray?: string|null;
  targetPath?: string|null;
  contentType?: string|null;
  description?: string|null;
  approved?: boolean|null;
  company?: string|null;
  dependent?: string|null;
  eventCustomer?: string|null;
  event?: string|null;
  layout?: string|null;
  portfolio?: string|null;
  user?: string|null;

}

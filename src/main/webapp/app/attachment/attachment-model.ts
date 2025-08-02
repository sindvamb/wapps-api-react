export class AttachmentDTO {

  constructor(data:Partial<AttachmentDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  size?: string|null;
  name?: string|null;
  contentType?: string|null;
  isPublic?: boolean|null;
  description?: string|null;
  path?: string|null;
  absoluteUrl?: string|null;
  inCloud?: boolean|null;
  fileData?: string|null;
  ticket?: string|null;

}

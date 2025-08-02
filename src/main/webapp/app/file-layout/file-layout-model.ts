export class FileLayoutDTO {

  constructor(data:Partial<FileLayoutDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  layoutName?: string|null;
  layoutSize?: number|null;

}

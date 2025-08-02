export class EducationDegreeDTO {

  constructor(data:Partial<EducationDegreeDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  code?: string|null;
  description?: string|null;

}

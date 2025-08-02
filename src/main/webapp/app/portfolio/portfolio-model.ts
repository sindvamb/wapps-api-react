export class PortfolioDTO {

  constructor(data:Partial<PortfolioDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  title?: string|null;
  filePath?: string|null;
  customerId?: string|null;
  company?: string|null;

}

export class CompanyDTO {

  constructor(data:Partial<CompanyDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  foundationDate?: string|null;
  cpfCnpj?: string|null;
  size?: number|null;
  corporateName?: string|null;
  stateRegistration?: string|null;
  municipalRegistration?: string|null;
  mainCnaeCode?: string|null;
  mainCnaeDescription?: string|null;
  legalNatureCode?: string|null;
  legalNatureDescription?: string|null;
  status?: number|null;
  hasGovBrRegistration?: boolean|null;
  hasDigitalCertificate?: boolean|null;
  tradeName?: string|null;
  hasLogo?: boolean|null;
  hasVisualIdentity?: boolean|null;
  inpiRegistration?: string|null;
  businessLaw?: string|null;
  employeesCount?: number|null;
  youngApprenticesCount?: number|null;
  usesESocial?: boolean|null;
  sebraeTraining?: string|null;
  senacTraining?: string|null;
  anvisaTraining?: string|null;
  civilDefenseTraining?: string|null;
  website?: string|null;
  email?: string|null;
  creatorId?: string|null;
  modifierId?: string|null;
  deleterId?: string|null;
  isDeleted?: boolean|null;
  createdAt?: string|null;
  updatedAt?: string|null;
  deletedAt?: string|null;
  paymentDate?: string|null;
  address?: string|null;
  customer?: string|null;

}

export class UserDTO {

  constructor(data:Partial<UserDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  matricula?: number|null;
  name?: string|null;
  socialName?: string|null;
  surname?: string|null;
  gender?: string|null;
  birthplace?: string|null;
  civilStatus?: string|null;
  fatherName?: string|null;
  motherName?: string|null;
  nationality?: string|null;
  rg?: string|null;
  ufIssuingBody?: string|null;
  cpfCnpj?: string|null;
  email?: string|null;
  password?: string|null;
  race?: string|null;
  profession?: string|null;
  cellPhone?: string|null;
  homePhone?: string|null;
  businessPhone?: string|null;
  hasSpecialNeeds?: boolean|null;
  specialNeedsOther?: string|null;
  isSystem?: boolean|null;
  isCustomer?: boolean|null;
  securelyPhrase?: string|null;
  loginAttemps?: number|null;
  passwordPolicyEnabled?: boolean|null;
  birthdate?: string|null;
  lastLoginAt?: string|null;
  lastPasswordChangedAt?: string|null;
  passwordResetToken?: string|null;
  creatorId?: string|null;
  modifierId?: string|null;
  deleterId?: string|null;
  isDeleted?: boolean|null;
  createdAt?: string|null;
  updatedAt?: string|null;
  deletedAt?: string|null;
  address?: string|null;
  educationDegree?: string|null;
  partnerUnit?: string|null;
  role?: string|null;
  userStatus?: string|null;

}

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserDTO } from 'app/user/user-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    matricula: yup.number().integer().emptyToNull(),
    name: yup.string().emptyToNull().required(),
    socialName: yup.string().emptyToNull(),
    surname: yup.string().emptyToNull(),
    gender: yup.string().emptyToNull(),
    birthplace: yup.string().emptyToNull(),
    civilStatus: yup.string().emptyToNull(),
    fatherName: yup.string().emptyToNull(),
    motherName: yup.string().emptyToNull(),
    nationality: yup.string().emptyToNull(),
    rg: yup.string().emptyToNull(),
    ufIssuingBody: yup.string().emptyToNull(),
    cpfCnpj: yup.string().emptyToNull().required(),
    email: yup.string().emptyToNull(),
    password: yup.string().emptyToNull(),
    race: yup.string().emptyToNull(),
    profession: yup.string().emptyToNull(),
    cellPhone: yup.string().emptyToNull(),
    homePhone: yup.string().emptyToNull(),
    businessPhone: yup.string().emptyToNull(),
    hasSpecialNeeds: yup.bool(),
    specialNeedsOther: yup.string().emptyToNull(),
    isSystem: yup.bool(),
    isCustomer: yup.bool(),
    securelyPhrase: yup.string().emptyToNull(),
    loginAttemps: yup.number().integer().emptyToNull(),
    passwordPolicyEnabled: yup.bool(),
    birthdate: yup.string().emptyToNull().offsetDateTime().required(),
    lastLoginAt: yup.string().emptyToNull().offsetDateTime(),
    lastPasswordChangedAt: yup.string().emptyToNull().offsetDateTime(),
    passwordResetToken: yup.string().emptyToNull().uuid(),
    creatorId: yup.string().emptyToNull().uuid(),
    modifierId: yup.string().emptyToNull().uuid(),
    deleterId: yup.string().emptyToNull().uuid(),
    isDeleted: yup.bool(),
    createdAt: yup.string().emptyToNull().offsetDateTime(),
    updatedAt: yup.string().emptyToNull().offsetDateTime(),
    deletedAt: yup.string().emptyToNull().offsetDateTime(),
    address: yup.string().emptyToNull().uuid(),
    educationDegree: yup.string().emptyToNull().uuid(),
    partnerUnit: yup.string().emptyToNull().uuid(),
    role: yup.string().emptyToNull().uuid(),
    userStatus: yup.string().emptyToNull().uuid()
  });
}

export default function UserEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('user.edit.headline'));

  const navigate = useNavigate();
  const [addressValues, setAddressValues] = useState<Record<string,string>>({});
  const [educationDegreeValues, setEducationDegreeValues] = useState<Record<string,string>>({});
  const [partnerUnitValues, setPartnerUnitValues] = useState<Record<string,string>>({});
  const [roleValues, setRoleValues] = useState<Record<string,string>>({});
  const [userStatusValues, setUserStatusValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const addressValuesResponse = await axios.get('/api/users/addressValues');
      setAddressValues(addressValuesResponse.data);
      const educationDegreeValuesResponse = await axios.get('/api/users/educationDegreeValues');
      setEducationDegreeValues(educationDegreeValuesResponse.data);
      const partnerUnitValuesResponse = await axios.get('/api/users/partnerUnitValues');
      setPartnerUnitValues(partnerUnitValuesResponse.data);
      const roleValuesResponse = await axios.get('/api/users/roleValues');
      setRoleValues(roleValuesResponse.data);
      const userStatusValuesResponse = await axios.get('/api/users/userStatusValues');
      setUserStatusValues(userStatusValuesResponse.data);
      const data = (await axios.get('/api/users/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateUser = async (data: UserDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/users/' + currentId, data);
      navigate('/users', {
            state: {
              msgSuccess: t('user.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('user.edit.headline')}</h1>
      <div>
        <Link to="/users" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('user.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateUser)} noValidate>
      <input type="submit" value={t('user.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6 mb-5" />
      <InputRow useFormResult={useFormResult} object="user" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="user" field="matricula" type="number" />
      <InputRow useFormResult={useFormResult} object="user" field="name" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="socialName" type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="surname" type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="gender" type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="birthplace" type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="civilStatus" type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="fatherName" type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="motherName" type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="nationality" type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="rg" type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="ufIssuingBody" type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="cpfCnpj" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="email" type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="password" type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="race" type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="profession" type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="cellPhone" type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="homePhone" type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="businessPhone" type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="hasSpecialNeeds" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="user" field="specialNeedsOther" type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="isSystem" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="user" field="isCustomer" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="user" field="securelyPhrase" type="textarea" />
      <InputRow useFormResult={useFormResult} object="user" field="loginAttemps" type="number" />
      <InputRow useFormResult={useFormResult} object="user" field="passwordPolicyEnabled" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="user" field="birthdate" required={true} />
      <InputRow useFormResult={useFormResult} object="user" field="lastLoginAt" />
      <InputRow useFormResult={useFormResult} object="user" field="lastPasswordChangedAt" />
      <InputRow useFormResult={useFormResult} object="user" field="passwordResetToken" />
      <InputRow useFormResult={useFormResult} object="user" field="creatorId" />
      <InputRow useFormResult={useFormResult} object="user" field="modifierId" />
      <InputRow useFormResult={useFormResult} object="user" field="deleterId" />
      <InputRow useFormResult={useFormResult} object="user" field="isDeleted" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="user" field="createdAt" />
      <InputRow useFormResult={useFormResult} object="user" field="updatedAt" />
      <InputRow useFormResult={useFormResult} object="user" field="deletedAt" />
      <InputRow useFormResult={useFormResult} object="user" field="address" type="select" options={addressValues} />
      <InputRow useFormResult={useFormResult} object="user" field="educationDegree" type="select" options={educationDegreeValues} />
      <InputRow useFormResult={useFormResult} object="user" field="partnerUnit" type="select" options={partnerUnitValues} />
      <InputRow useFormResult={useFormResult} object="user" field="role" type="select" options={roleValues} />
      <InputRow useFormResult={useFormResult} object="user" field="userStatus" type="select" options={userStatusValues} />
      <input type="submit" value={t('user.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}

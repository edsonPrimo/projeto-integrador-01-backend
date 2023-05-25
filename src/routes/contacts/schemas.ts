import * as yup from 'yup';

export const CreateContactSchema = {
  body: yup
    .object({
      name: yup.string().required(),
      email: yup.string().required(),
      description: yup.string().required(),
      additionalData: yup.string().nullable(),
      status: yup.string().required(),
    })
    .required(),
};

export const GetContactsSchema = {
  querystring: yup.object({
    offset: yup.number().optional(),
    limit: yup.number().optional(),
  }),
};

export const UpdateContactsSchema = {
  body: yup
    .object({
      name: yup.string().required(),
      email: yup.string().required(),
      description: yup.string().required(),
      additionalData: yup.string().nullable(),
      status: yup.string().required(),
    })
    .required(),
};

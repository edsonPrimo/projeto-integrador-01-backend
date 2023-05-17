import * as yup from 'yup';

export const CreateUserSchema = {
  body: yup
    .object({
      name: yup.string().required(),
      email: yup.string().required(),
      phone: yup.string().required(),
      birthDate: yup.string().required(),
    })
    .required(),
};

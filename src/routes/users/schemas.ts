import * as yup from 'yup';

export const CreateUserSchema = {
  body: yup
    .object({
      name: yup.string().required(),
      email: yup.string().required(),
    })
    .required(),
};

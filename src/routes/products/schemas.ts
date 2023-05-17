import * as yup from 'yup';

export const CreateProductSchema = {
  body: yup
    .object({
      name: yup.string().required(),
      picture: yup.string().required(),
      value: yup.string().required(),
      sku: yup.string().required(),
    })
    .required(),
};

export const GetProductByIdSchema = {
  params: yup
    .object({
      id: yup.string().required(),
    })
    .required(),
};

export const GetProductsSchema = {
  querystring: yup.object({
    offset: yup.number().optional(),
    limit: yup.number().optional(),
  }),
};

export const UpdateProductSchema = {
  body: yup
    .object({
      name: yup.string().nullable(),
      picture: yup.string().nullable(),
      value: yup.string().nullable(),
      sku: yup.string().nullable(),
    })
    .required(),
};

import * as yup from "yup";

export const phoneRegex =
  "^(?:9[1-36][0-9]|2[12][0-9]|2[35][1-689]|24[1-59]|26[1-35689]|27[1-9]|28[1-69]|29[1256])[0-9]{6}$";

export const validationSchemaUtilizadores = yup.object({
  nome: yup
    .string()
    .min(5, "O nome deve ter pelo menos 5 caracteres.")
    .required("Este campo é obrigatório."),
  email: yup
    .string()
    .email("Email inválido.")
    .required("Este campo é obrigatório."),
  telemovel: yup
    .string()
    .matches(phoneRegex, "Contacto inválido.")
    .required("Este campo é obrigatório."),
});

export const validationSchemaPerfil = yup.object({
  telemovel: yup
    .string()
    .matches(phoneRegex, "Contacto inválido.")
    .required("Este campo é obrigatório."),
  password: yup
    .string()
    .min(5, "A password deverá ter pelo menos 5 caracteres."),
});

export const validationSchemaLimpeza = yup.object({
  sala: yup.string().required("Este campo é obrigatório."),
  observacoes: yup
    .string()
    .min(5, "As observações necessitam de ter pelo menos 5 caracteres.")
    .max(300, "As observações podem ter no máximo 300 caracteres."),
});

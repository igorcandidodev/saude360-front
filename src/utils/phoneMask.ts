// Crie uma função chamada `cellPhoneMask` que recebe um valor de telefone e retorna o valor formatado como (99)99999-9999.
export const phoneMask = (value: any) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1)$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

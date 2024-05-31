// crie uma função chamada `cnpjMask` que recebe um valor de CNPJ e retorna o valor formatado como 99.999.999/9999-99.
export const cnpjMask = (value: any) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const formatPhone = (number: string) => {
  console.log('number', number);
  const digitsOnly = number?.replace(/\D/g, '');
  console.log('digitsONly', digitsOnly);
  if (digitsOnly?.length >= 11) {
    const part1 = digitsOnly.slice(0, 2);
    const part2 = digitsOnly.slice(2, 7);
    const part3 = digitsOnly.slice(7, 11);
    return `(${part1}) ${part2}-${part3}`;
  }
  return '';
};

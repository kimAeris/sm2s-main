// 사업자번호 형식
export const validBusinessNumber = (value) => {
  const regex = /^[0-9]{3}-[0-9]{2}-[0-9]{5}$/;

  return regex.test(value);
};

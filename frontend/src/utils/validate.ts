export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;

  return passwordRegex.test(password);
};

export const validateContent = (content: string): boolean => {
  if (content.trim() === '') return false;

  return true;
};

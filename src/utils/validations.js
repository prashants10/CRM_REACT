export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,})/;
  return regex.test(password);
};

export const validatePassword = (password: string): boolean => {
  const lengthRequirement = /.{8,}/;
  const uppercaseRequirement = /[A-Z]/;
  const numberRequirement = /\d/;
  const specialCharRequirement = /[!@#$%^&*(),.?":{}|<>]/;

  return (
    lengthRequirement.test(password) &&
    uppercaseRequirement.test(password) &&
    numberRequirement.test(password) &&
    specialCharRequirement.test(password)
  );
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

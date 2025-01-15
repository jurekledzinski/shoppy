export const patternPassword = () => {
  return {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message:
      'Password must be 8+ characters with at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.',
  };
};

export const validateConfirmPassword = <T extends Record<string, string>>(
  value: string | undefined,
  formValues: T
) => {
  return formValues.password === value || "Passwords aren't the same";
};

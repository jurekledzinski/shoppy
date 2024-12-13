export const errorMessageAction = (message: string) => {
  return {
    message,
    success: false,
  };
};

export const transformMessage = (name: string) => {
  switch (name) {
    case 'JWTExpired':
      return "Your url link isn't valid anymore, request new one";
    case 'TokenExpiredError':
      return 'Invalid or expired link, please try one more time';
    case 'CredentialsSignin':
      return 'Incorrect credentials';
    case 'AccessDenied':
      return 'Incorrect credentials';
    default:
      return 'Something went wrong, please try later';
  }
};

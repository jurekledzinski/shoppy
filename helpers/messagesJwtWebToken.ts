export const transformMessage = (name: string) => {
  switch (name) {
    case 'TokenExpiredError':
      return 'Invalid or expired link, please try one more time';
    case 'JsonWebTokenError':
      return 'Invalid or expired link, please try one more time';
    default:
      return 'Something went wrong, please one more time';
  }
};

export type comparePasswordsFn = (
  password: string,
  hash: string
) => Promise<boolean>;

export type createTokenFn = (
  payload: string | object,
  secret: string,
  timeExp: string
) => Promise<string>;

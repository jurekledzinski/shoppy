export type State<T> = {
  message: string;
  success: boolean;
  payload?: T;
};

export type IdPayload = { id: string };
export type CartInventoryPayload = {
  name: string;
  productId: string;
  image: string;
  onStock: number;
  cartQuantity: number;
};

export type comparePasswordsFn = (
  password: string,
  hash: string
) => Promise<boolean>;

export type createTokenFn = (
  payload: string | object,
  secret: string,
  timeExp: string
) => Promise<string>;

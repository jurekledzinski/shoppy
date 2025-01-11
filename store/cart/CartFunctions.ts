import { CartActionHandler } from './types';
import { Cart } from '@/models';
import { cloneDeep } from 'lodash';
import { initialState } from './CartProvider';

export const addItem: CartActionHandler = (state, action) => {
  if (action.type !== 'ADD_ITEM') return state;

  const indexAddProduct = state.cart
    ? state.cart.products.findIndex(
        (product) => product._id === action.payload.data._id
      )
    : -1;

  let udpatedProducts: Cart['products'];

  if (indexAddProduct >= 0) {
    udpatedProducts = cloneDeep(state.cart ? state.cart.products : []);
    udpatedProducts[indexAddProduct].quantity += action.payload.data.quantity;
  } else {
    udpatedProducts = [
      ...cloneDeep(state.cart ? state.cart.products : []),
      action.payload.data,
    ];
  }

  const totalAmountCart = udpatedProducts.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const totalPriceCart = udpatedProducts.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  );

  const cartId =
    indexAddProduct < 0 ? action.payload.id! : state.cart?.cartId ?? '';

  return {
    cart: {
      ...state.cart,
      cartId,
      products: udpatedProducts,
      totalAmountCart,
      totalPriceCart,
    },
  };
};

export const removeItem: CartActionHandler = (state, action) => {
  if (action.type !== 'REMOVE_ITEM') return state;

  const restProducts = state.cart.products.filter(
    (product) => product._id !== action.payload.id
  );

  const totalAmountCartAfterRemove = restProducts.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const totalPriceCartAfterRemove = restProducts.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  );

  return {
    cart: {
      ...state.cart,
      cartId: state.cart.products.length ? state.cart.cartId : null,
      products: restProducts,
      totalAmountCart: totalAmountCartAfterRemove,
      totalPriceCart: totalPriceCartAfterRemove,
    },
  };
};

export const updateItem: CartActionHandler = (state, action) => {
  if (action.type !== 'SET_QUANTITY') return state;

  const indexProduct = state.cart.products.findIndex(
    (product) => product._id === action.payload.id
  );

  let udpatedProduct: Cart['products'];

  if (indexProduct >= 0) {
    udpatedProduct = cloneDeep(state.cart.products);
    udpatedProduct[indexProduct].quantity = action.payload.qunatity;
  } else {
    udpatedProduct = cloneDeep(state.cart.products);
  }

  const totalAmount = udpatedProduct.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const totalPrice = udpatedProduct.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  );

  return {
    cart: {
      ...state.cart,
      products: udpatedProduct,
      totalAmountCart: totalAmount,
      totalPriceCart: totalPrice,
    },
  };
};

export const setItem: CartActionHandler = (state, action) => {
  if (action.type !== 'SET_CART') return state;

  return {
    cart: action.payload,
  };
};

export const clearCart: CartActionHandler = (state, action) => {
  if (action.type !== 'CLEAR_CART') return state;
  return { cart: initialState.cart };
};

// ---------------------

export const subtractItem: CartActionHandler = (state, action) => {
  if (action.type !== 'SUBTRACT_ITEM') return state;

  const indexSubtrackProduct = state.cart.products.findIndex(
    (product) => product._id === action.payload.id
  );

  let udpatedSubtractProducts: Cart['products'];

  if (indexSubtrackProduct >= 0) {
    udpatedSubtractProducts = cloneDeep(state.cart.products);
    udpatedSubtractProducts[indexSubtrackProduct].quantity -= 1;
  } else {
    udpatedSubtractProducts = cloneDeep(state.cart.products);
  }

  const totalAmountSubtractCart = udpatedSubtractProducts.reduce(
    (acc, product) => product.quantity - acc,
    0
  );

  const totalPriceSubtractCart = udpatedSubtractProducts.reduce(
    (acc, product) => (product.quantity - acc) * product.price,
    0
  );

  return {
    cart: {
      ...state.cart,
      products: udpatedSubtractProducts,
      totalAmountCart: totalAmountSubtractCart,
      totalPriceCart: totalPriceSubtractCart,
    },
  };
};

export const increaseItem: CartActionHandler = (state, action) => {
  if (action.type !== 'INCREASE_ITEM') return state;

  const indexIncreaseProduct = state.cart.products.findIndex(
    (product) => product._id === action.payload.id
  );

  let udpatedIncreaseProducts: Cart['products'];

  if (indexIncreaseProduct >= 0) {
    udpatedIncreaseProducts = cloneDeep(state.cart.products);
    udpatedIncreaseProducts[indexIncreaseProduct].quantity += 1;
  } else {
    udpatedIncreaseProducts = cloneDeep(state.cart.products);
  }

  const totalAmountIncreaseCart = udpatedIncreaseProducts.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const totalPriceIncreaseCart = udpatedIncreaseProducts.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  );

  return {
    cart: {
      ...state.cart,
      products: udpatedIncreaseProducts,
      totalAmountCart: totalAmountIncreaseCart,
      totalPriceCart: totalPriceIncreaseCart,
    },
  };
};

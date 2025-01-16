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

  const totalAmountCart = sumTotalAmountCart(udpatedProducts);

  const totalPriceCart = sumTotalPriceCart(udpatedProducts);

  const cartId = action.payload.id ? action.payload.id : state.cart?.cartId;

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

  const totalAmountCartAfterRemove = sumTotalAmountCart(restProducts);

  const totalPriceCartAfterRemove = sumTotalPriceCart(restProducts);

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

  const totalAmount = sumTotalAmountCart(udpatedSubtractProducts);
  const totalPriceCart = sumTotalPriceCart(udpatedSubtractProducts);

  return {
    cart: {
      ...state.cart,
      products: udpatedSubtractProducts,
      totalAmountCart: totalAmount,
      totalPriceCart: totalPriceCart,
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

  const totalAmountIncreaseCart = sumTotalAmountCart(udpatedIncreaseProducts);

  const totalPriceIncreaseCart = sumTotalPriceCart(udpatedIncreaseProducts);

  return {
    cart: {
      ...state.cart,
      products: udpatedIncreaseProducts,
      totalAmountCart: totalAmountIncreaseCart,
      totalPriceCart: totalPriceIncreaseCart,
    },
  };
};

export function sumTotalAmountCart(products: Cart['products']) {
  const totalAmount = products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  return totalAmount;
}

export function sumTotalPriceCart(products: Cart['products']) {
  const totalPrice = products.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  );
  return totalPrice;
}

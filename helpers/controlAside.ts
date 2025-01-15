import { AsideState, AsideType, Checkout } from '@/store/aside';

export const controlAside = (
  context: AsideState,
  currentElement: string,
  actionElement: AsideType,
  stateOpen: boolean,
  checkout?: Checkout
) => {
  if (actionElement !== currentElement && stateOpen) {
    context.onChange(actionElement, !stateOpen);

    const idTimeout = setTimeout(() => {
      context.onChange(currentElement, true, checkout ?? null);
      clearTimeout(idTimeout);
    }, 1000);

    return;
  }

  if (currentElement === 'menu' || currentElement === 'cart') {
    context.onChange(currentElement, !stateOpen);
  }
};

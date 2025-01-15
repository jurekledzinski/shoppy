import {
  faEnvelope,
  faHome,
  faList,
  faListCheck,
} from '@fortawesome/free-solid-svg-icons';

export const steps = [
  {
    path: '/',
    icon: faHome,
    label: 'Home',
  },
  {
    path: '/shipping',
    icon: faEnvelope,
    label: 'Shipping',
  },
  {
    path: '/shipping/place-order',
    icon: faList,
    label: 'Place order',
  },
  {
    path: '/shipping/place-order/details-order',
    icon: faListCheck,
    label: 'Details order',
  },
];

export const mainOptions = {
  type: 'fade',
  fixedHeight: '300px',
  pagination: false,
  arrows: false,
  classes: { slide: 'splide__slide arrows' },
};

export const thumbsOptions = {
  type: 'slide',
  rewind: true,
  fixedWidth: '25%',
  fixedHeight: 'auto',
  isNavigation: true,
  slideFocus: true,
  pagination: false,
  dragMinThreshold: {
    mouse: 4,
    touch: 10,
  },
  breakpoints: {
    600: {
      fixedWidth: '33.2%',
      fixedHeight: '100px',
    },
  },
};

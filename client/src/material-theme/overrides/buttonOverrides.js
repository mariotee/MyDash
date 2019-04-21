import palette from '../palette.js';

export default {
  containedPrimary: {
    '&$disabled': {
      opacity: palette.action.disabled.opacity,
      backgroundColor: palette.primary.main,
    },
  },
  containedSecondary: {
    '&$disabled': {
      opacity: palette.action.disabled.opacity,
      backgroundColor: palette.secondary.main,
    },
  },
};

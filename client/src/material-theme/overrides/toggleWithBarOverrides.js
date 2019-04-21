import palette from '../palette.js';

export default {
  colorPrimary: {
    '&$checked': {
      color: palette.primary.main,
      '&$disabled': {
        opacity: palette.action.disabled.opacity,
        color: palette.primary.main,
        '& + $bar': { backgroundColor: palette.primary.main },
      },
    },
  },
  colorSecondary: {
    '&$checked': {
      color: palette.secondary.main,
      '&$disabled': {
        opacity: palette.action.disabled.opacity,
        color: palette.secondary.main,
        '& + $bar': { backgroundColor: palette.secondary.main },
      },
    },
  },
};

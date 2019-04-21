import { createMuiTheme } from '@material-ui/core/styles';
import palette from './palette.js';
import toggleOverrides from './overrides/toggleOverrides.js';
import toggleWithBarOverrides from './overrides/toggleWithBarOverrides.js';
import buttonOverrides from './overrides/buttonOverrides.js';

const theme = createMuiTheme({
  palette,
  spacing: { sidebar: 256 },
  misc: {
    navShadow: `0 4px 16px 0 ${palette.primary.main + '60'},
                0 4px 16px 0 #00000030`,
  },
  overrides: {
    MuiButton: buttonOverrides,
    MuiSwitch: toggleWithBarOverrides,
    MuiCheckbox: toggleOverrides,
    MuiRadio: toggleOverrides,
  },
});
export default theme;

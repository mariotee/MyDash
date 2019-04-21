// Header Style
const style = (theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.spacing.sidebar}px)`,
    },
    maxHeight: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  header: { padding: `${theme.spacing.unit * 3}px` },
  button: {
    margin: `${theme.spacing.unit * 2}px`,
    minWidth: `${theme.spacing.unit * 7}px`,
    maxWidth: `${theme.spacing.unit * 7}px`,
    minHeight: `${theme.spacing.unit * 7}px`,
    maxHeight: `${theme.spacing.unit * 7}px`,
  },
});

export default style;

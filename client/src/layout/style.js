export default (theme) => ({
  main: {
    [theme.breakpoints.up('md')]: {
      marginLeft: `${theme.spacing.sidebar}px`,
    },
  },
  content: {
    margin: `0 ${theme.spacing.unit * 3}px`,
  },
});

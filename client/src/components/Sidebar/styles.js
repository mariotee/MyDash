const style = (theme) => ({
  sidebartop: {
    padding: `${theme.spacing.unit * 3}px 0`,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logoText: {
    display: 'block',
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontSize: `${theme.typography.fontSize * 1.3}px`,
    lineHeight: `${theme.spacing.unit * 4}px`,
    '&,&:hover,&:focus': {
      color: theme.palette.type === 'dark'
        ? theme.palette.primary.contrastText
        : 'inherit',
    },
  },
  item: {
    position: 'relative',
    display: 'block',
    margin: '0',
    padding: '0',
  },
  itemLink: {
    margin: `${theme.spacing.unit * 2}px`,
    textDecoration: 'none',
    borderRadius: `${theme.shape.borderRadius}px`,
    display: 'block',
    padding: `${theme.spacing.unit * 2}px`,
    '&:hover': { backgroundColor: theme.palette.action.hover },
    '&,&:hover,&:focus': { color: 'inherit' },
  },
  itemIcon: {
    color: 'inherit',
    float: 'left',
    opacity: '0.8',
  },
  itemText: {
    lineHeight: `${theme.spacing.unit * 3}px`,
    fontSize: `${theme.typography.fontSize}px`,
    display: 'block',
    whiteSpace: 'nowrap',
  },
  itemActive: {
    '&,&:hover,&:focus': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      boxShadow: theme.misc.navShadow,
    },
  },
  sidebarWrapper: {
    position: 'relative',
    overflow: 'auto',
    width: `${theme.spacing.sidebar}px`,
    zIndex: '1',
    overflowScrolling: 'touch',
    color: 'inherit',
  },
});

export default style;

export default (theme) => ({
  ...theme,
  tableWrapper: {
    overflow: 'auto',
    height: '90%',
  },
  row: { '&:nth-of-type(odd)': { backgroundColor: theme.palette.background.default } },
});

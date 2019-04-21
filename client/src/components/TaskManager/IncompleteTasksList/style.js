export default (theme) => ({
  root: {
    overflow: "auto",
  },
  head: {
    fontSize: '16px',
    fontWeight: '700',
  },
  cell: {
    minWidth: "100px",
    alignText: 'left',
    fontSize: '14px',
  },
  row: { '&:nth-of-type(odd)': { backgroundColor: theme.palette.background.default } },
});

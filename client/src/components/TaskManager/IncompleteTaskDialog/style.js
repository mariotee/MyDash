export default (theme) => ({
  ...theme,
  textField: {
    width: '60%',
    padding: '0 0 5% 0',
  },
  button: {
    padding: '0 10%',
    margin: '8px',
  },
  eyeball: {
    margin: '0',
    padding: '5%',
    width: '40%',
    transition: 'width .25s',
  },
  expanded: {
    width: '100%',
    transition: 'width .25s',
  },
  grayscale: { filter: 'grayscale(100%)' },
  grayscaleButton: { margin: '0 0 0 75%' },
});

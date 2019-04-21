/*RETURNS array of data sorted by name, omitting articles*/
export const sortCustomerData = (data) => {
  return data.sort(
    (a, b) =>
      removeArticlesFromStringName(a.name)
      < removeArticlesFromStringName(b.name)
        ? -1
        : 1,
  );
};

/*RETURNS string with articles ommitted; to be used in sorting*/
export const removeArticlesFromStringName = (str) => {
  str = str.toString().toLowerCase();
  let words = str.split(' ');
  if (words[0] === 'a' || words[0] === 'the' || words[0] === 'an') {
    return words.splice(1).join(' ');
  }
  return str;
};

const formatCurrency = (array) => {
  for (items of array) {
    items.value = `R$ ${items.value}`.replace(".", ",");
  }
  return array;
};

module.exports = formatCurrency;

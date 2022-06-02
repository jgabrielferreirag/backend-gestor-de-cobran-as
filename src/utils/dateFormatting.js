const { format } = require("date-fns");

const dateFormatting = (array) => {
  for (items of array) {
    items.due_date = format(items.due_date, "dd/MM/yyyy");
  }
  return array;
};

module.exports = dateFormatting;

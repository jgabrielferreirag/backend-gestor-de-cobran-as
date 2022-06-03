const removeEmptyStrings = (object) => {
  const objectArray = Object.entries(object);

  for (pair of objectArray) {
    if (pair[1] === "") {
      object.pair[0] = null;
    }
  }

  return object;
};

module.exports = removeEmptyStrings;

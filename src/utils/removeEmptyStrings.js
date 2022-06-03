///Não está sendo usado///

const removeEmptyStrings = (object) => {
  const newObject = object;
  const objectArray = Object.entries(newObject);

  for (pair of objectArray) {
    if (pair[1] === "") {
      newObject.pair[0] = undefined;
    }
  }

  return newObject;
};

module.exports = removeEmptyStrings;

const generateId = () => {
  const id = Math.floor(Math.random() * 899999999 + 100000000);
  return id;
};

module.exports = generateId;

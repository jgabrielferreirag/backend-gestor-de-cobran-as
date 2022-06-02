const generateId = () => {
  const id = Math.floor(Math.random() * 1000000000);
  return id;
};

module.exports = generateId;

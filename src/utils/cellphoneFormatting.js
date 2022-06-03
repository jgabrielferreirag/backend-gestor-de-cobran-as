const formatCellphone = (cellphone) => {
  formattedCellphone = `${cellphone.slice(0, 2)} ${cellphone.slice(
    2,
    3
  )} ${cellphone.slice(3, 7)} ${cellphone.slice(8)}`;
  return formattedCellphone;
};

module.exports = formatCellphone;

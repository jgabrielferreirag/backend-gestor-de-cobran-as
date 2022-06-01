const returnInitials = (name) => {
  const nameList = name.split(" ");
  let initials;
  if (nameList.length === 1) {
    initials = (nameList[0].charAt(0) + nameList[0].charAt(1)).toUpperCase();
  } else {
    initials = (nameList[0].charAt(0) + nameList[1].charAt(0)).toUpperCase();
  }

  const firstName = nameList[0].charAt(0).toUpperCase() + nameList[0].slice(1);
  return { firstName, initials };
};

module.exports = { returnInitials };

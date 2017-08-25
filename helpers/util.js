const dateReg = new RegExp("^([0-9]{4})-([0-9]{2})-([0-9]{2})$");

const checkDate = (date) => {
  const matches = dateReg.exec(date)
  // console.log(matches)
  if (!matches) return false
  else if (matches.length < 3) return false
  const composedDate = new Date(matches[1], (matches[2] - 1), matches[3])

  return ((composedDate.getMonth() == (matches[2] - 1)) &&
          (composedDate.getDate() == matches[3]) &&
          (composedDate.getFullYear() == matches[1]))
}

module.exports = {
  checkDate
}
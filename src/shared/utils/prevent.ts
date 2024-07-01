export const preventTelNumber = (value: string) => {
  let changeValue = value.replace(/[^0-9]/g, "");
  if (changeValue.length > 11) {
    changeValue = value.substring(0, 11);
  } else if (changeValue.length > 7) {
    changeValue =
      changeValue.substring(0, 3) +
      "-" +
      changeValue.substring(3, 7) +
      "-" +
      changeValue.substring(7);
  } else if (changeValue.length > 3) {
    changeValue = changeValue.substring(0, 3) + "-" + changeValue.substring(3);
  }
  return changeValue;
};

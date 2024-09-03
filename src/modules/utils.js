const filterDuplicateArrays = (array) => {
  const data = array.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  return data;
};

export { filterDuplicateArrays };

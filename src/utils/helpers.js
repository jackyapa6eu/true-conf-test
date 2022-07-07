export function createInitialArray(defaultObj, count) {
  const resultArr = [];
  for (let i = 0; i < count; i++) {
    const clonedObj = Object.assign({}, defaultObj);
    clonedObj.id = i;
    resultArr.push(clonedObj);
  }
  return resultArr
}

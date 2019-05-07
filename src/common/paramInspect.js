const paramInspect = (param) => {
  for (let key in param) {
    if (param[key] === "") {
      delete param[key]
    }
  }
  return param;
}

export default paramInspect;

const rows = {
  Deux: 2,
  Trois: 3,
};

export const buildComponents = (components) => {
  const arr = [];
  components.map((c) => {
    const obj = [];
    const json = {};
    obj.push({ type: c.__component.split(".")[1] });
    for (const key in c) if (key != "__component") obj.push({ [key]: c[key] });
    for (const object of obj)
      for (const prop in object) json[prop] = object[prop];
    arr.push(json);
  });
  return arr;
};

export const buildSections = (array) => {
  const resp = [];
  const elementsToSplice = [];
  array.forEach((el, index) => {
    const temp = [];
    if (el.type == "section") {
      let rowsCount = rows[el.elements_par_ligne];
      let espacement_bas = el.espacement_bas;
      let i = index + 1;
      while (i < array.length - 1 && array[i].type != "fin-de-section") {
        elementsToSplice.push(i);
        temp.push(array[i]);
        i++;
      }
      resp.push({
        rows: rowsCount,
        elements: temp,
        sectionId: el.id,
        espacement_bas: espacement_bas,
      });
    }
  });

  let arrayResp = [];
  array.forEach((e, i) => {
    if (elementsToSplice.indexOf(i) == -1) arrayResp.push(e);
  });

  return [resp, arrayResp];
};

export const fetchData = (url) => {
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "Application/json",
    },
  }).then((rep) => rep.json());
};

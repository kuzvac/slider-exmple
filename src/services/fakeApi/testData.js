const items = [
  {"Name":"Item 1","Percent":0},
  {"Name":"Item 2","Percent":0},
  {"Name":"Item 3","Percent":0},
  {"Name":"Item 4","Percent":0},
  {"Name":"Item 5","Percent":0},
];

export const authSuccess = (count) => {
  return {
    "body":{
      "Items": items.slice(0, count)
    }
  }
};

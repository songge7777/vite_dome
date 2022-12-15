/*
  /page/ss/111.tsx
  /page/ss/222.tsx
  /page/home.tsx
  /page/index.tsx
  /page/ss/xx/333.tsx
  /page/ss/xx/444.tsx

*/
const input = [
  [{ name: "ss", element: "1" }, { name: "111" }],
  [{ name: "ss" }, { name: "222" }],
  [{ name: "home" }],
  [{ name: "index" }],
  [{ name: "ss" }, { name: "xx" }, { name: "333" }],
  [{ name: "ss" }, { name: "xx" }, { name: "444" }],
  // ["ss", "222"],
  // ["home",],
  // ["index"],
  // ["ss", "xx", "333"],
  // ["ss", "xx", "444"],
];

function createTreeFromArray(arr) {
  const cache = {};
  const root = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      const name = arr[i][j].name;
      const element = arr[i][j].element;
      if (!cache[name]) {
        cache[name] = element ? {
          name,
          element
        } : {
          name,
        };
      }
      if (j > 0) {
        const parent = cache[arr[i][j - 1].name];
        parent.children ? "" : parent.children = [];
        if (parent.children.indexOf(cache[name]) < 0) {
          parent.children.push(cache[name]);
        }
      } else {
        if (root.indexOf(cache[name]) < 0) {
          root.push(cache[name]);
        }
      }
    }
  }
  return root;

}
console.log("createTreeFromArray", createTreeFromArray(input));


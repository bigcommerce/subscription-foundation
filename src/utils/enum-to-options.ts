export default function enumToOptions(val) {
  return Object.keys(val).map(v => {
    return {
      value: val[v],
      content: v
    };
  });
}

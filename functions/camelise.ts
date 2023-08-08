export function camelise(str: string) {
  return str
    .replace(/[^A-Z0-9]/gi, " ")
    .replace(/(\w+)/gi, (word, _, offset) => {
      return offset === 0
        ? word.toLowerCase()
        : `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
    })
    .replace(/\s+/g, "");
}

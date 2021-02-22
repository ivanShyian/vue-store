export function parseDatabase(data) {
  return Object.keys(data).map(el => {
    return { ...data[el], id: el }
  })
}

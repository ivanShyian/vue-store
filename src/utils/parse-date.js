export function parseDate(msTime) {
  const date = new Date(msTime).toISOString()
  return date.split('', date.length - 8).join('').replace('T', ' ')
}

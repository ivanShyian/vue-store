export function parseDate(msTime) {
  const date = new Date(msTime).toLocaleDateString()
  const time = new Date(msTime).toLocaleTimeString()
  return date + ' ' + time
}

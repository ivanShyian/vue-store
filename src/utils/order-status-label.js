const BUTTONS = {
  performing: 'Отметить выполненным',
  done: 'В архив'
}
const STATUS = {
  performing: 'Выполняется',
  done: 'Выполнен'
}
export function buttonTitle(status) {
  return BUTTONS[status] ? BUTTONS[status] : 'Взять в работу'
}
export function statusTitle(status) {
  return STATUS[status] ? STATUS[status] : 'В очереди'
}

const ERROR_MAP = {
  INVALID_PASSWORD: 'Неверный пароль',
  EMAIL_NOT_FOUND: 'Пользователя с данным email не найдено',
  auth: 'Войдите в систему'
}
export function errorMessage(value) {
  return ERROR_MAP[value] ? ERROR_MAP[value] : value
}

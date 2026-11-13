export function isValidTitle(title) {
  return typeof title === 'string' && title.trim().length > 0;
}
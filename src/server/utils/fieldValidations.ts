


export const isValidDate = (date: unknown) => {
  return typeof date === 'string' && !isNaN(Date.parse(date));
}
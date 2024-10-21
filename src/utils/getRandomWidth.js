export const getRandomWidth = (min = 50, max = 100) => {
  return `${Math.floor(Math.random() * (max - min + 1) + min)}%`
}

export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



function capitalize(someString) {
  return (someString =
    someString[0].toUpperCase() + someString.slice(1).toLowerCase());
}

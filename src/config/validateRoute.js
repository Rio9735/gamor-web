export default function validateRoute(location) {
  switch (location) {
    case "/":
    case "/streams":
    case "/party":
    case "/premium":
      return true;
    default:
      return false;
  }
}

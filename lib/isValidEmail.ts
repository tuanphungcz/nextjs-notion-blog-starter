export default function isValidEmail(email) {
  const pattern = /\S+@\S+\.\S+/;
  return pattern.test(email);
}

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  // add token to header if exists
  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}

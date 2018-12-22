import http from "./httpService";

const apiEndpoint = "/users";

export function register(user) {
  console.log("endpoint", apiEndpoint);
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName
  });
}

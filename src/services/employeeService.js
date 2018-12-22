import http from "./httpService";

const apiEndpoint = "/employees";

function employeeUrl(id) {
  return `${apiEndpoint}/${id}`;
}
export function getEmployees() {
  return http.get(apiEndpoint);
}

export function getEmployee(employeeId) {
  return http.get(employeeUrl(employeeId));
}

export function createEmployee(employee) {
  return http.post(apiEndpoint, employee);
}

export function updateEmployee(employee) {
  const body = { ...employee };
  delete body._id;
  return http.put(employeeUrl(employee._id), body);
}

export function deleteEmployee(employeeId) {
  return http.delete(employeeUrl(employeeId));
}

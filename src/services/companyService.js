import http from "./httpService";

const apiEndpoint = "/companies";

export function getCompanies() {
  return http.get(apiEndpoint);
}

export function getCompanyById(companyId) {
  const companyUrl = `${apiEndpoint}/${companyId}`;
  return http.get(companyUrl);
}

export function addCompany(company) {
  return http.post(apiEndpoint, company);
}

import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/companies";

export function getCompanies() {
  return http.get(apiEndpoint);
}

export function getCompanyById(companyId) {
  const companyUrl = `${apiEndpoint}/${companyId}`;
  return http.get(companyUrl);
}

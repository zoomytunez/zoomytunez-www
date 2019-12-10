const BASE_URL_PROD = "https://zoomytunez.appspot.com/"
const BASE_URL_DEV = "http://localhost:8080/"

/* eslint-disable no-restricted-globals */
export const SERVICE_URL = (location.hostname === "localhost") ? BASE_URL_DEV : BASE_URL_PROD
export const WWW_URL = location.href
/* eslint-enable no-restricted-globals */
export const API_URL = SERVICE_URL + "api/"

function api(endpoint, options) {
  return fetch(API_URL + endpoint, {
    credentials: "include",
    mode: "cors",
    ...options
  }).then(data=>data.json())
}

export function getUser() {
  return api("user")
}
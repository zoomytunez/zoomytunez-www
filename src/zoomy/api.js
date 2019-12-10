const BASE_URL_PROD = "https://zoomytunez.appspot.com/"
const BASE_URL_DEV = "http://localhost:8080/"

export const SERVICE_URL = (window.location.hostname === "localhost") ? BASE_URL_DEV : BASE_URL_PROD
export const WWW_URL = window.location.href
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

export function setHeight(height) {
  return api("user/height", {
    "method": "post",
    "body": height
  })
}
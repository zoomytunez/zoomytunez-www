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

function encode(params) {
  let parts = []
  for (let name of Object.keys(params)) {
    parts.push(window.encodeURIComponent(name) + "=" + window.encodeURIComponent(params[name]))
  }
  return parts.join('&')
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

export function createPlaylist(data) {
  return api("playlist/build", {
    "method": "post",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": JSON.stringify(data)
  })
}

export function renamePlaylist(id, name) {
  return api("playlist/rename", {
    "method": "post",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": JSON.stringify({id, name})
  })
}

export function search(query, limit=50, offset=0) {
  return api("search?" + encode({q:query, limit, offset}))
}
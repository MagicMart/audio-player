function setItem(params) {
  window.localStorage.setItem("updatestoke", JSON.stringify(params))
}

function getItem() {
  return JSON.parse(window.localStorage.getItem("updatestoke")) || {}
}

export { setItem, getItem }

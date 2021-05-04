function setItem(params) {
  window.localStorage.setItem("updatestoke", JSON.stringify(params))
}

function getItem() {
  return JSON.parse(localStorage.getItem("updatestoke")) || {}
}

export { setItem, getItem }

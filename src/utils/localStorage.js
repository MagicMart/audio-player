function setItem(params) {
  window.localStorage.setItem("updatestoke", JSON.stringify(params))
}

function getItem() {
  if (typeof window === "undefined") return
  return JSON.parse(localStorage.getItem("updatestoke")) || {}
}

export { setItem, getItem }

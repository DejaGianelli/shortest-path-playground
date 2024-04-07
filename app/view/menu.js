import createModal from "./modal.js"

export default function createMenu(enableDrawCityMode, enableDrawPathMode) {
    const shortestPathBtn = document.getElementById("shortest-path-btn")
    const modalElem = document.querySelector(".modal")
    const modal = createModal(modalElem)

    shortestPathBtn.addEventListener("click", modal.open)

    const pathModeBtn = document.getElementById("path-mode-btn")
    pathModeBtn.addEventListener("click", enableDrawPathMode)
    
    const cityModeBtn = document.getElementById("city-mode-btn")
    cityModeBtn.addEventListener("click", enableDrawCityMode)
}
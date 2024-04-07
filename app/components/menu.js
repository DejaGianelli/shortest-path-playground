import createModal from "./modal.js"

export default function createMenu() {
    const shortestPathBtn = document.querySelector("#shortest-path-btn")
    const modalElem = document.querySelector(".modal")
    const modal = createModal(modalElem)

    shortestPathBtn.addEventListener("click", modal.open)

    return {
        shortestPathBtn
    }
}
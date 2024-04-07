import createApplication from "./app/app.js"
import renderCanvas from "./app/render.js"
import createMenu from "./app/components/menu.js"

const canvas = document.getElementById("canvas")

window.addEventListener("load", function() {
    const { state } = createApplication(canvas, window)
    createMenu()
    renderCanvas(state)
})
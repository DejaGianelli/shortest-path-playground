import createApplication from "./app/app.js"
import renderCanvas from "./app/render.js"

const canvas = document.getElementById("canvas")

window.addEventListener("load", function() {
    const { state } = createApplication(canvas, window)
    renderCanvas(state)
})
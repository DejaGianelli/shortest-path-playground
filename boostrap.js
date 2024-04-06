import createApplication from "./app/app.js"
import renderCanvas from "./app/render.js"

window.addEventListener("load", function() {
    const canvas = document.getElementById("canvas")
    const { state } = createApplication(canvas, window)
    renderCanvas(state)
});  
import createApplication from "./app/app.js"
import renderCanvas from "./app/view/render.js"
import createMenu from "./app/view/menu.js"
import createCanvas from "./app/view/canvas.js"
import createShortestPathForm from "./app/view/shortest-path-form.js"

window.addEventListener("load", function() {
    const app = createApplication(window)
    const { element, enableDrawCityMode, enableDrawPathMode } = createCanvas(app, window)
    createMenu(enableDrawCityMode, enableDrawPathMode)
    const { cities, paths, size } = app
    const form = createShortestPathForm(app)
    renderCanvas(cities, paths, size, element)
})
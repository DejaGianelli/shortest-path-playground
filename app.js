import { HandleCityModeClicked, HandlePathModeClicked } from "./event_handlers/draw_mode_menu.js"
import { DrawPathMode } from "./models/DrawPathMode.js"
import { DrawCityMode } from "./models/DrawCityMode.js"

function Application() {
    
    this.drawMode = new DrawPathMode()
    this.canvas
    this.context
    this.isDrawing = false

    /**
     * Object that is drawing on the Canvas at the moment
     * @type {PathDrawer}
     */
    this.drawer

    /**
     * Array of Paths
     * @type {Path[]}
     */    
    this.paths = []

    /**
     * Array of City
     * @type {City[]}
     */    
    this.cities = []

    this.start = function() {
        this.initCanvas()
        this.initModes()
    }

    this.initModes = function() {
        const pathModeBtn = document.getElementById("path-mode-btn")
        pathModeBtn.addEventListener("click", HandlePathModeClicked)

        const cityModeBtn = document.getElementById("city-mode-btn")
        cityModeBtn.addEventListener("click", HandleCityModeClicked)

        this.drawMode.enable();
    }

    this.initCanvas = function() {
        const canvas = document.getElementById("canvas");
        if (canvas.getContext) {
            this.canvas = canvas
            this.context = canvas.getContext("2d");
        }
    }

    this.changeDrawMode = function(mode) {
        if (this.drawMode == mode) {
            return
        }
        this.drawMode.disable()
        if (mode == "path") {
            this.drawMode = new DrawPathMode()
        }
        if (mode == "city") {
            this.drawMode = new DrawCityMode()
        }
        this.drawMode.enable()
    }
}

function bootstrap(e) {
    window.App = new Application()
    App.start()
}

window.addEventListener("load", bootstrap);
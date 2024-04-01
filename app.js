import { 
    handleMouseMove, 
    handleMouseDown, 
    handleMouseUp, 
    handleCityModeClicked, 
    handlePathModeClicked, 
    handleDrawCity,
    handleCollision
} from "./event_handlers.js"

function DrawCityMode() {
    this.enable = function() {
        App.canvas.addEventListener("click", handleDrawCity)
    }

    this.disable = function() {
        App.canvas.removeEventListener("click", handleDrawCity)
    }
}

function DrawPathMode() {
    this.collision = false;

    const hc = handleCollision.bind(this)
    const hmm = handleMouseMove.bind(this)
    const hmd = handleMouseDown.bind(this)
    const hmu = handleMouseUp.bind(this)

    this.enable = function() {
        App.canvas.addEventListener("mousemove", hmm)
        App.canvas.addEventListener("mousedown", hmd)
        window.addEventListener("mouseup", hmu)
        App.canvas.addEventListener("mousemove", hc)
    }

    this.disable = function() {
        App.canvas.removeEventListener("mousemove", hmm)
        App.canvas.removeEventListener("mousedown", hmd)
        window.removeEventListener("mouseup", hmu)
        App.canvas.removeEventListener("mousemove", hc)
    }
}

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

        const self = this
    }

    this.initModes = function() {
        const pathModeBtn = document.getElementById("path-mode-btn")
        pathModeBtn.addEventListener("click", handlePathModeClicked)

        const cityModeBtn = document.getElementById("city-mode-btn")
        cityModeBtn.addEventListener("click", handleCityModeClicked)

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
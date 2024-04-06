import City from "./models/City.js"
import { Path } from "./models/Path.js"
import Point from "./models/Point.js"
import { createDrawPathModeListener, createDrawCityModeListener } from "./listeners/draw-mode-listener.js"
import createPathDraw from "./path-draw.js"

export default function createApplication(canvas, window) {
    const state = {
        size: {
            width: 0,
            height: 0
        },
        canvas: canvas,
        drawMode:  { 
            type: "city",
            listeners: []
        },
        cities: {},
        paths: {},
        currentDrawing: undefined,
        isDrawing: false
    }

    function drawCity(command) {
        console.log("Drawing City in Canvas")
        const city = new City(new Point(command.x, command.y), command.size)
        if (cityCollide(city)) {
            console.log("Can't draw because of a city collision")
            return
        }
        state.cities[city.id] = city
        console.log(`City Draw. Id: ${city.id}`)
    }

    function cityCollide(city) {
        let collide = false
        Object.entries(state.cities).forEach(([, current]) => {
            const deltaX = Math.abs(current.center.x - city.center.x)
            const deltaY = Math.abs(current.center.y - city.center.y)
            const distance = city.radius() + current.radius()
            if (deltaX < distance && deltaY < distance) {
                collide = true
            }
        })
        return collide
    }

    function changeDrawMode(command) {
        console.log("Cleaning current listeners...")
        for (const {eventType, target, handler} of state.drawMode.listeners) {
            target.removeEventListener(eventType, handler)
        }
        state.drawMode = command
        console.log(`Mode changed to ${command.type}`)     
    }

    /**
     * Checks whether a point in the canvas collides with something
     * @param {Point} point
     * @returns {bool} 
     */
    function hasCollision(point) {
        //TODO: improve performance of this method, since it iterates over all cities and point in the border of the circle
        // this algorithm is O(n^2)
        let collide = false
        Object.entries(state.cities).forEach(([, city]) => {
            for (let y = 0, rad = 0.0174533; y < 360, rad < 6.28319; y++, rad += 0.0174533) {
                const catX = city.radius() * Math.cos(rad)
                const catY = city.radius() * Math.sin(rad)
                const offsetX = catX + city.center.x
                const offsetY = catY + city.center.y
                if (
                    //Checks if the point is between the city
                    point.x <= offsetX && point.x >= (offsetX - (catX * 2)) &&
                    point.y <= offsetY && point.y >= (offsetY - (catY * 2))
                ) {
                    console.log(`Point x: ${point.x} y: ${point.y} collided`)
                    collide = true
                }
            }
        })
        return collide
    }

    /**
     * Sets the application to drawing mode, indicating that something is being draw
     * @param {Point} command
     */
    function startDrawingPath(command) {
        const point = new Point(command.x, command.y)
        if (hasCollision(point)) {
            console.log("Can't draw, there is a city here")
            return
        }
        state.isDrawing = true
        const path = new Path()
        state.paths[path.id] = path
        const drawing = createPathDraw(path.id, command.x, command.y)
        state.currentDrawing = drawing
        console.log(`Path Drawing started. Id: ${path.id}`)
    }

    function stopDrawingPath(command) {
        if (hasCollision(new Point(command.mouseX, command.mouseY))) {
            const { id, } = state.currentDrawing
            delete state.paths[id]
            console.log("Cannot make a path inside city")
        }
        state.isDrawing = false
        state.currentDrawing = undefined
        console.log("Drawing ended")
    }

    function drawPath(command) {
        if (!state.isDrawing) {
            return
        }
        const { id, dequeue } = state.currentDrawing
        state.currentDrawing.draw(command)
        const segment = dequeue()
        if (segment) {
            state.paths[id].segments.push(segment)
            console.log("Segment Draw")
        }
    }

    function setCanvasSize() {
        const container = document.getElementById("convas-container")
        state.size.width = container.clientWidth
        state.size.height = container.clientHeight
    }

    window.addEventListener("resize", function(e) {
        setCanvasSize()
    });
    
    const drawPathModeListener = createDrawPathModeListener(state, window)
    drawPathModeListener.subscribe("drawingStarted", startDrawingPath)
    drawPathModeListener.subscribe("drawingEnded", stopDrawingPath)
    drawPathModeListener.subscribe("draw", drawPath)
    drawPathModeListener.subscribe("change", changeDrawMode)

    const drawCityModeListener = createDrawCityModeListener(state)
    drawCityModeListener.subscribe("draw", drawCity)
    drawCityModeListener.subscribe("change", changeDrawMode)

    drawCityModeListener.set()
    setCanvasSize()

    return {
        state
    }
}
import City from "./models/City.js"
import { Path } from "./models/Path.js"
import Point from "./models/Point.js"
import createPathDrawing from "./path-drawing.js"
import { Graph } from "./models/Graph.js"

export default function createApplication() {
    
    const size = {
        width: 0,
        height: 0
    }
    const cities = {}
    const paths = {}
    let currentDrawing = undefined
    let isDrawing = false
    const graph = Graph()
    
    function getShortestPath(from, to) {
        return graph.getShortestPath(from, to)
    }

    function drawCity(command) {
        console.log("Drawing City in Canvas")
        const city = City(Point(command.x, command.y), command.size)
        if (collidesWithCity(city)) {
            console.log("Can't draw because of a city collision")
            return
        }
        cities[city.id] = city
        graph.addNode(city.id)
        console.log(`City Draw. Id: ${city.id}`)
    }

    function collidesWithCity(city) {
        for (const [, current] of Object.entries(cities)) {
            const distance = getPointsDistance(current.center, city.center)
            const minDistance = city.radius() + current.radius()
            if (distance < minDistance) {
                return true
            }
        }
        return false
    }

    /**
     * @param {Point} to 
     * @param {Point} from 
     */
    function getPointsDistance(to, from) {
        const deltaX = Math.abs(to.x - from.x)
        const deltaY = Math.abs(to.y - from.y)
        return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
    }

    /**
     * @param {Point} point 
     */
    function isInsideCity(point) {
        let collision = undefined
        for (const [, current] of Object.entries(cities)) {
            const distance = getPointsDistance(point, current.center)
            const maxDistance = current.radius()
            if (distance <= maxDistance) {
                collision = { city: current }
                break
            }
        }
        return collision
    }

    /**
     * Sets the application to drawing mode, indicating that something is being draw
     * @param {Point} command
     */
    function startDrawingPath(command) {
        const point = Point(command.x, command.y)
        const collision = isInsideCity(point)
        if (!collision) {
            console.log("A Path must connect two cities")
            return
        } 
        isDrawing = true
        const path = Path()
        path.from = collision.city
        paths[path.id] = path
        const drawing = createPathDrawing(path.id, command.x, command.y)
        currentDrawing = drawing
        console.log(`Path Drawing started. Id: ${path.id}`)
    }

    function stopDrawingPath(command) {
        if (!isDrawing) {
            return
        }
        const collision = isInsideCity(Point(command.mouseX, command.mouseY))
        if (!collision) {
            const { id } = currentDrawing
            delete paths[id]
            console.log("A Path must connect two cities")
        } else {
            const { id } = currentDrawing
            paths[id].to = collision.city
            graph.addEdge(paths[id].from.id, paths[id].to.id, paths[id].distance())
            console.log(`Path Drawing ended. Distance: ${paths[id].distance()}`)
        }
        isDrawing = false
        currentDrawing = undefined
    }

    function drawPath(command) {
        if (!isDrawing) {
            return
        }
        const { id, dequeue } = currentDrawing
        currentDrawing.draw(command)
        const segment = dequeue()
        if (segment) {
            paths[id].segments.push(segment)
            console.log("Segment Draw")
        }
    }

    function setCanvasSize() {
        const container = document.getElementById("convas-container")
        size.width = container.clientWidth
        size.height = container.clientHeight
    }

    setCanvasSize()

    return {
        cities, 
        paths, 
        size,
        setCanvasSize,
        startDrawingPath,
        stopDrawingPath,
        drawPath,
        drawCity,
        getShortestPath
    }
}
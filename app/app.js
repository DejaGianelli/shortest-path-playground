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
    
    /**
     * Checks whether a point in the canvas collides with something
     * @param {Point} point
     * @returns {bool} 
     */
    function hasCollision(point) {
        //TODO: improve performance of this method, since it iterates over all cities and point in the border of the circle
        // this algorithm is O(n^2)
        let collision = undefined
        for (const [, city] of Object.entries(cities)) {
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
                    console.log(`Point x: ${point.x} y: ${point.y} collided with city ${city.id}`)
                    collision = { city: city }
                    break;
                }
            }
        }
        return collision
    }

    function drawCity(command) {
        console.log("Drawing City in Canvas")
        const city = City(Point(command.x, command.y), command.size)
        if (cityCollide(city)) {
            console.log("Can't draw because of a city collision")
            return
        }
        cities[city.id] = city
        graph.addNode(city.id)
        console.log(`City Draw. Id: ${city.id}`)
    }

    function cityCollide(city) {
        for (const [, current] of Object.entries(cities)) {
            const deltaX = Math.abs(current.center.x - city.center.x)
            const deltaY = Math.abs(current.center.y - city.center.y)
            const distance = city.radius() + current.radius()
            if (deltaX < distance && deltaY < distance) {
                return true
            }
        }
        return false
    }

    /**
     * Sets the application to drawing mode, indicating that something is being draw
     * @param {Point} command
     */
    function startDrawingPath(command) {
        const point = Point(command.x, command.y)
        const collision = hasCollision(point)
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
        const collision = hasCollision(Point(command.mouseX, command.mouseY))
        if (!collision) {
            const { id } = currentDrawing
            delete paths[id]
            console.log("A Path must connect two cities")
        } else {
            const { id } = currentDrawing
            paths[id].to = collision.city
            graph.addEdge(paths[id].from.id, paths[id].to.id, paths[id].distance())
        }
        isDrawing = false
        currentDrawing = undefined
        console.log("Drawing ended")
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
    }
}
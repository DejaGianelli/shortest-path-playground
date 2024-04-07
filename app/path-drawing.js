import { Segment } from "./models/Path.js"
import Point from "./models/Point.js"

export default function createPathDrawing(id, initialX, initialY) {
    const state = {
        id: id,
        x: initialX,
        y: initialY,
        segments: [],
        observers: {},
        delaying: false
    }

    function complete(cityTo) {
        state.cityTo = cityTo
    }

    function draw(command) {
        if (!state.delaying) {
            const mouseX = command.mouseX
            const mouseY = command.mouseY
            const segment = Segment(Point(state.x, state.y), Point(mouseX, mouseY))
            state.segments.push(segment)
            state.x = mouseX
            state.y = mouseY
        }
    }

    // Gives a small delay between segments draw
    setInterval(() => {
        state.delaying = !state.delaying
    }, 50);

    function dequeue() {
        return state.segments.shift()
    }

    return {
        id: state.id,
        dequeue: dequeue,
        draw,
        complete
    }
}
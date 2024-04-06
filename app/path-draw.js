import { Segment } from "./models/Path.js"
import Point from "./models/Point.js"

export default function createPathDraw(pathId, initialX, initialY) {
    const state = {
        id: pathId,
        x: initialX,
        y: initialY,
        segments: [],
        observers: {},
        delaying: false
    }

    function draw(command) {
        if (!state.delaying) {
            const mouseX = command.mouseX
            const mouseY = command.mouseY
            const segment = new Segment(new Point(state.x, state.y), new Point(mouseX, mouseY))
            state.segments.push(segment)
            state.x = mouseX
            state.y = mouseY
        }
    }

    // Gives a small delay between segments draw
    setInterval(() => {
        state.delaying = !state.delaying
    }, 50);

    return {
        id: state.id,
        segments: state.segments,
        draw
    }
}
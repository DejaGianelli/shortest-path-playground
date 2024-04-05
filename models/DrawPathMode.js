import { HandleCollision } from "../event_handlers/canvas.js"
import { HandleMouseMove, HandleMouseUp, HandleMouseDown } from "../event_handlers/draw_path_mode.js"

function DrawPathMode() {
    this.collision = false;

    const hc = HandleCollision.bind(this)
    const hmm = HandleMouseMove.bind(this)
    const hmd = HandleMouseDown.bind(this)
    const hmu = HandleMouseUp.bind(this)

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

export { DrawPathMode }
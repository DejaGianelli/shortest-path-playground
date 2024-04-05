import { Segment } from "../models/Path.js"
import { Point } from "../models/Point.js"

function PathDrawer(x = 0, y = 0) {
    this.pathId = Math.floor(Math.random() * 100)
    /**
     * Array of Segments
     * @type {Segment[]}
     */
    this.segments = []
    this.delaying = false
    this.x = x
    this.y = y

    this.draw = function(x1, y1, x2, y2) {
        const context = App.context
        context.beginPath();
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        this.segments.push(new Segment(new Point(x1, y1), new Point(x2, y2)))
        context.closePath();
    }

    this.reset = function() {
        this.x = 0
        this.y = 0
    }

    setInterval(() => {
        this.delaying = !this.delaying
    }, 50);
}

export { PathDrawer }
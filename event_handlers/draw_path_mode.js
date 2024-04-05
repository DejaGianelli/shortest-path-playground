import { PathDrawer } from "../models/PathDrawer.js"
import { Path } from "../models/Path.js"

function HandleMouseMove(e) {
    if (!App.isDrawing) {
        return
    }
    let drawer = App.drawer
    if (!drawer.delaying) {    
        drawer.draw(drawer.x, drawer.y, e.offsetX, e.offsetY)
        drawer.x = e.offsetX;
        drawer.y = e.offsetY;
        drawer.delaying = true
    } 
}

function HandleMouseDown(e) {
    if (this.collision) {
        console.log("Can't draw, there is a city here")
        return
    }
    App.drawer = new PathDrawer(e.offsetX, e.offsetY)
    App.isDrawing = true
}

function HandleMouseUp(e) {
    if (!App.isDrawing) {
        return
    }
    let drawer = App.drawer
    drawer.draw(drawer.x, drawer.y, e.offsetX, e.offsetY)
    drawer.reset()
    App.isDrawing = false
    App.paths.push(new Path(drawer.segments))
}

export { HandleMouseUp, HandleMouseDown, HandleMouseMove }

export default function createCanvas(app, window) {

    const element = document.getElementById("canvas")
    const listeners = []

    function enableDrawCityMode() {
        clearListeners()
        canvas.addEventListener("click", handleDrawCity)
        console.log("Draw City Mode enabled")
    }

    function enableDrawPathMode() {
        clearListeners()
        canvas.addEventListener("mousemove", handleMouseMove)
        canvas.addEventListener("mousedown", handleMouseDown)
        window.addEventListener("mouseup", handleMouseUp)
        console.log("Draw Path Mode enabled")
    }

    function clearListeners() {
        console.log("Cleaning current listeners...")
        for (const {eventType, target, handler} of listeners) {
            target.removeEventListener(eventType, handler)
        }
        listeners.splice(0, listeners.length);
    }

    function handleDrawCity(e) {
        listeners.push({ eventType: "click", target: e.target, handler: handleDrawCity })
        const command = { x: e.offsetX, y: e.offsetY, size: 50 }
        app.drawCity(command)
    }

    function handleMouseDown(e) {
        console.log("Starting to draw a path...")
        listeners.push({ eventType: "mousedown", target: e.target, handler: handleMouseDown })
        const command = { x: e.offsetX, y: e.offsetY }
        app.startDrawingPath(command)
    }

    function handleMouseMove(e) {
        listeners.push({ eventType: "mousemove", target: e.target, handler: handleMouseMove })
        const command = { mouseX: e.offsetX, mouseY: e.offsetY }
        app.drawPath(command)
    }

    function handleMouseUp(e) {
        console.log("Mouse Up")
        listeners.push({ eventType: "mouseup", target: window, handler: handleMouseUp })
        const command = { mouseX: e.offsetX, mouseY: e.offsetY }
        app.stopDrawingPath(command)
    }

    window.addEventListener("resize", function(e) {
        app.setCanvasSize()
    });

    enableDrawCityMode()

    return {
        element,
        enableDrawCityMode,
        enableDrawPathMode
    }
}
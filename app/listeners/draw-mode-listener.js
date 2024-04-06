function createDrawCityModeListener(app) {
    const state = {
        canvas: app.canvas,
        observers: {}
    }

    function subscribe(type, observerFn) {
        state.observers[type] = observerFn
    }

    function notifyAll(type, command) {
        state.observers[type](command)
    }

    function handleDrawCityModeBtnClicked(e) {
        set()
    }

    function set() {
        const command = { 
            type: "city",
            listeners: [
                { eventType: "click", target: canvas, handler: handleDrawCity }
            ]
        }
        notifyAll("change", command)
        canvas.addEventListener("click", handleDrawCity)
        console.log("Draw City Mode enabled")
    }

    function handleDrawCity(e) {
        const command = { x: e.offsetX, y: e.offsetY, size: 50 }
        notifyAll("draw", command)
    }

    document.getElementById("city-mode-btn").addEventListener("click", handleDrawCityModeBtnClicked)

    return {
        subscribe,
        set
    }
}

function createDrawPathModeListener(app, window) {
    const state = {
        canvas: app.canvas,
        observers: {}
    }

    function subscribe(type, observerFn) {
        state.observers[type] = observerFn
    }

    function notifyAll(type, command) {
        state.observers[type](command)
    }

    function handleDrawPathModeBtnClicked(e) {
        const command = { 
            type: "path",
            listeners: [
                { eventType: "mousemove", target: state.canvas, handler: handleMouseMove },
                { eventType: "mousedown", target: state.canvas, handler: handleMouseDown },
                { eventType: "mouseup", target: window, handler: handleMouseUp }
            ]
        }
        
        notifyAll("change", command)
        state.canvas.addEventListener("mousemove", handleMouseMove)
        state.canvas.addEventListener("mousedown", handleMouseDown)
        window.addEventListener("mouseup", handleMouseUp)
        console.log("Draw Path Mode enabled")
    }

    function handleMouseDown(e) {
        console.log("Starting to draw a path...")
        const command = { x: e.offsetX, y: e.offsetY }
        notifyAll('drawingStarted', command)
    }

    function handleMouseMove(e) {
        const command = { mouseX: e.offsetX, mouseY: e.offsetY }
        notifyAll('draw', command)
    }

    function handleMouseUp(e) {
        console.log("Mouse Up")
        const command = { mouseX: e.offsetX, mouseY: e.offsetY }
        notifyAll('drawingEnded', command)
    }

    document.getElementById("path-mode-btn").addEventListener("click", handleDrawPathModeBtnClicked)

    return {
        subscribe
    }
}

export {
    createDrawPathModeListener,
    createDrawCityModeListener
}
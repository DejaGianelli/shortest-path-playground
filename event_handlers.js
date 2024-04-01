import { Path, City, Point } from "./models.js";
import { PathDrawer } from "./controllers.js";

function handleMouseMove(e) {
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

function handleMouseDown(e) {
    if (this.collision) {
        console.log("Can't draw, there is a city here")
        return
    }
    App.drawer = new PathDrawer(e.offsetX, e.offsetY)
    App.isDrawing = true
}

function handleMouseUp(e) {
    if (!App.isDrawing) {
        return
    }
    let drawer = App.drawer
    drawer.draw(drawer.x, drawer.y, e.offsetX, e.offsetY)
    drawer.reset()
    App.isDrawing = false
    App.paths.push(new Path(drawer.segments))
    //console.log(App.paths)
}

function handleDrawCity(e) {
    const newCity = new City(new Point(e.offsetX, e.offsetY), 50)
    for (let i = 0; i < App.cities.length; i++) {
        const city = App.cities[i]
        const deltaX = Math.abs(city.center.x - newCity.center.x)
        const deltaY = Math.abs(city.center.y - newCity.center.y)
        const distance = newCity.radius() + city.radius()
        if (deltaX < distance && deltaY < distance) {
            console.log("City collision")
            return;
        }
    }
    
    App.context.beginPath();
    App.context.arc(newCity.center.x, newCity.center.y, newCity.radius(), 0, 2 * Math.PI);
    App.context.stroke();
    
    App.cities.push(newCity)

    //console.log(App.cities)
}

function handleCollision(e) {
    
    for (let i = 0; i < App.cities.length; i++) {
        
        const city = App.cities[i]

        for (let y = 0, rad = 0.0174533; y < 360, rad < 6.28319; y++, rad += 0.0174533) {
            
            const catX = city.radius() * Math.cos(rad)
            const catY = city.radius() * Math.sin(rad)

            const offsetX = catX + city.center.x
            const offsetY = catY + city.center.y

            if (
                //Checks if it is between the city
                e.offsetX <= offsetX && e.offsetX >= (offsetX - (catX * 2)) &&
                e.offsetY <= offsetY && e.offsetY >= (offsetY - (catY * 2))
            ) {
                console.log("Collision")
                this.collision = true
                break
            } else {
                this.collision = false
            }
        }
    }
}

function handleCityModeClicked(e) {
    App.changeDrawMode("city")
}

function handlePathModeClicked(e) {
    App.changeDrawMode("path")
}

export { handleMouseUp, handleMouseDown, handleMouseMove, handleCityModeClicked, handlePathModeClicked, handleDrawCity, handleCollision }
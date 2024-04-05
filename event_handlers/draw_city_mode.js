import { City } from "../models/City.js";
import { Point } from "../models/Point.js";

function HandleDrawCity(e) {
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
}

export { HandleDrawCity }
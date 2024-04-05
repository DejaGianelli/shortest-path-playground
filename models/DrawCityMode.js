import { HandleDrawCity } from "../event_handlers/draw_city_mode.js"

function DrawCityMode() {
    this.enable = function() {
        App.canvas.addEventListener("click", HandleDrawCity)
    }

    this.disable = function() {
        App.canvas.removeEventListener("click", HandleDrawCity)
    }
}

export { DrawCityMode }
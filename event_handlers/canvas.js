function HandleCollision(e) { 
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

export { HandleCollision }
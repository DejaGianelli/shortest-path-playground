export default function renderCanvas({ canvas, cities, paths }) {
    const context = canvas.getContext("2d")
    context.fillStyle = 'white'
    context.clearRect(0, 0, 800, 400)

    for (const [, city] of Object.entries(cities)) {
        context.beginPath();
        context.arc(city.center.x, city.center.y, city.radius(), 0, 2 * Math.PI);
        context.stroke();
    }
    
    for (const [, path] of Object.entries(paths)) {
        for (const segment of path.segments) {
            context.beginPath();
            context.strokeStyle = "black";
            context.lineWidth = 1;
            context.moveTo(segment.p1.x, segment.p1.y);
            context.lineTo(segment.p2.x, segment.p2.y);
            context.stroke();
            context.closePath();
        }
    }
    
    requestAnimationFrame(() => {
        renderCanvas({ canvas, cities, paths })
    })
}
/**
 * Represents a Path that connects two Cities.
 * @constructor
 * @param {Array} segments - Array of Segments
 */
function Path(segments = []) {
    /**
     * Path Id
     * @type {int}
     */
    this.id
    /**
     * Array of Segments
     * @type {Segment[]}
     */
    this.segments = segments

    this.distance = function() {
        return this.segments.reduce((acc, current) => {
            return acc + current.distance()
        }, 0)
    }

    this.id = Math.floor(Math.random() * 100)
}

/**
 * Represents a Point in Graph.
 * @constructor
 * @param {int} x - Coord on the x axis
 * @param {int} y - Coord on the y axis
 */
function Point(x, y) {
    this.x = x
    this.y = y
}

/**
 * Represents a Point in Graph.
 * @constructor
 * @param {Point} p1 - Point one in the cartesion plan
 * @param {Point} p2 - Point two in the cartesion plan
 */
function Segment(p1, p2) {
    this.p1 = p1
    this.p2 = p2

    this.distance = function() {
        const deltaX = (p2.x - p1.x)
        const deltaY = (p2.y - p1.y)
        return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
    }
}

/**
 * Represents a City in the Map. A City is always represented by a circle
 * @constructor
 * @param {Point} center - A Point representing the center of the city
 * @param {int} size - The size of the city in the plan. For a circle, it is the diameter
 */
function City(center, size) {
    this.center = center
    this.size = size

    this.radius = function() {
        return this.size / 2
    }
}

export { Segment, Path, Point, City }
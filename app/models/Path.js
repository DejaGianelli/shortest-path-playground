import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

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

    this.getId = function() {
        return this.id
    }

    this.id = uuidv4()
}

/**
 * Represents a segment of a Path. A Path is composed by multiple Segments (tiny lines)
 * @constructor
 * @param {Point} p1 - Point one in the cartesian plan
 * @param {Point} p2 - Point two in the cartesian plan
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

export { Path, Segment }
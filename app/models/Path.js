import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

/**
 * Represents a Path that connects two Cities.
 * @constructor
 * @param {Array} segments - Array of Segments
 */
function Path() {
    /**
     * Path Id
     * @type {int}
     */
    const id = uuidv4()
    /**
     * Array of Segments
     * @type {Segment[]}
     */
    const segments = []

    function distance() {
        return segments.reduce((acc, current) => {
            return acc + current.distance()
        }, 0)
    }

    return {
        id,
        distance,
        segments
    }
}

/**
 * Represents a segment of a Path. A Path is composed by multiple Segments (tiny lines)
 * @constructor
 * @param {Point} p1 - Point one in the cartesian plan
 * @param {Point} p2 - Point two in the cartesian plan
 */
function Segment(p1, p2) {
    const _p1 = p1
    const _p2 = p2

    function distance() {
        const deltaX = (p2.x - p1.x)
        const deltaY = (p2.y - p1.y)
        return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
    }

    return {
        distance,
        p1: _p1,
        p2: _p2
    }
}

export { Path, Segment }
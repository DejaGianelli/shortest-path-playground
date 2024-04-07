/**
 * Represents a Point in the Canvas. Coordinates in cartesian plan
 * @constructor
 * @param {int} x - Coord on the x axis
 * @param {int} y - Coord on the y axis
 */
export default function Point(x, y) {
    const _x = x
    const _y = y
    
    return {
        x: _x,
        y: _y
    }
}
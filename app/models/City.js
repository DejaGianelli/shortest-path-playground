import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

/**
 * Represents a City in the Map. A City is always represented by a circle
 * @constructor
 * @param {Point} center - A Point representing the center of the city
 * @param {int} size - The size of the city in the plan. For a circle, it is the diameter
 */
export default function City(center, size) {
    const _id = uuidv4()
    const _center = center
    const _size = size

    function radius() {
        return size / 2
    }

    return {
        id: _id,
        center: _center,
        size: _size,
        radius
    }
}
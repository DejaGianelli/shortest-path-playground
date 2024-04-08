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
    const color = generateColor()

    function radius() {
        return size / 2
    }

    function generateColor() {
        const randomNum = Math.floor(Math.random() * 16777215)
        let hexNum = randomNum.toString(16);
        hexNum = hexNum.padStart(6, '0');
        return "#" + hexNum;
    }

    function getIdShort() {
        return _id.slice(0, 4)
    }

    return {
        id: _id,
        center: _center,
        size: _size,
        radius,
        color,
        getIdShort
    }
}
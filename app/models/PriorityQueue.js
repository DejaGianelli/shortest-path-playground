/**
 * Represents a Priority Queue
 * @constructor
 * @param {Comparator} cmp - Object that implements Comparator interface
 */
export default function PriorityQueue(cmp) {
    /**
     * Array of Object
     * @type {Object[]}
     */
    let items = []
    let count = 0
    /**
     * Function that compare two objects
     * @type {Function}
     */
    let comparator = cmp;

    /**
     * Adds an item in the queue
     * @param {Object} item - Some item
     */
    this.add = function(item) {
        let i = 0
        for (i = (count - 1); i >= 0; i--) {
            if (comparator(items[i], item) > 0) {
                items[i + 1] = items[i]
            } else {
                break
            }
        }
        i = i + 1
        items[i] = item
        count++
    }

    /**
     * Removes a item from the queue by priority
     * @returns {Object} item - Removed item
     */
    this.remove = function() {
        if (count == 0)
            throw Error("Queue is empty!")
        return items[--count]
    }
}
import { describe, expect, test } from '@jest/globals';
import PriorityQueue from '../app/models/PriorityQueue.js';

describe('Priority Queue', () => {
    test('Adds items and remove them by priority', () => {

        const comparator = (obj, to) => {
            if (obj > to) {
                return 1
            } else if (obj === to) {
                return 0
            } else {
                return -1
            }
        };

        var queue = PriorityQueue(comparator);

        queue.add(4)
        queue.add(5)
        queue.add(2)

        expect(queue.remove()).toBe(5);
        expect(queue.remove()).toBe(4);
        expect(queue.remove()).toBe(2);
    });
});
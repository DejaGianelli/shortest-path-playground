import { describe, expect, test } from '@jest/globals';
import QuadTree, { Node } from '../app/models/QuadTree';
import Point from '../app/models/Point';

describe('Quad Tree', () => {
    test('Simple Test', () => {

        const tree = new QuadTree(Point(0,0), Point(8,8))

        const a = new Node(Point(0,0), 1)
        const b = new Node(Point(5,0), 2)
        const c = new Node(Point(5,5), 3)
        const d = new Node(Point(0,5), 1)

        tree.insert(a)
        tree.insert(b)
        tree.insert(c)
        tree.insert(d)

        console.log(tree)
    });
});
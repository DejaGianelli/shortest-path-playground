import Point from "./Point";

// The objects that we want stored in the quadtree
export class Node {
    constructor(pos, data) {
        this.pos = pos;
        this.data = data;
    }
}
 
// The main quadtree class
export default class QuadTree {
    constructor(topL, botR) {
        this.topLeft = topL;
        this.botRight = botR;
        this.n = null;
        this.topLeftTree = null;
        this.topRightTree = null;
        this.botLeftTree = null;
        this.botRightTree = null;
    }
 
    // Insert a node into the quadtree
    insert(node) {
        if (node === null) {
            return;
        }
 
        // Current quad cannot contain it
        if (!this.inBoundary(node.pos)) {
            return;
        }
 
        // We are at a quad of unit area
        // We cannot subdivide this quad further
        if (Math.abs(this.topLeft.x - this.botRight.x) <= 1 && Math.abs(this.topLeft.y - this.botRight.y) <= 1) {
            if (this.n === null) {
                this.n = node;
            }
            return;
        }
 
        if ((this.topLeft.x + this.botRight.x) / 2 >= node.pos.x) {
            // Indicates topLeftTree
            if ((this.topLeft.y + this.botRight.y) / 2 >= node.pos.y) {
                if (this.topLeftTree === null) {
                    this.topLeftTree = new QuadTree(this.topLeft, Point((this.topLeft.x + this.botRight.x) / 2, (this.topLeft.y + this.botRight.y) / 2));
                }
                this.topLeftTree.insert(node);
            }
            // Indicates botLeftTree
            else {
                if (this.botLeftTree === null) {
                    this.botLeftTree = new QuadTree(Point(this.topLeft.x, (this.topLeft.y + this.botRight.y) / 2), Point((this.topLeft.x + this.botRight.x) / 2, this.botRight.y));
                }
                this.botLeftTree.insert(node);
            }
        } else {
            // Indicates topRightTree
            if ((this.topLeft.y + this.botRight.y) / 2 >= node.pos.y) {
                if (this.topRightTree === null) {
                    this.topRightTree = new QuadTree(Point((this.topLeft.x + this.botRight.x) / 2, this.topLeft.y), Point(this.botRight.x, (this.topLeft.y + this.botRight.y) / 2));
                }
                this.topRightTree.insert(node);
            }
            // Indicates botRightTree
            else {
                if (this.botRightTree === null) {
                    this.botRightTree = new QuadTree(Point((this.topLeft.x + this.botRight.x) / 2, (this.topLeft.y + this.botRight.y) / 2), this.botRight);
                }
                this.botRightTree.insert(node);
            }
        } 
    }
 
    // Check if current quadtree contains the point
    inBoundary(p) {
        return p.x >= this.topLeft.x && p.x <= this.botRight.x && p.y >= this.topLeft.y && p.y <= this.botRight.y;
    }
}
import PriorityQueue from "./PriorityQueue.js"

function comparator(obj, to) {
    if (obj.priority > to.priority) {
        return 1
    } else if (obj.priority === to.priority) {
        return 0
    } else {
        return -1
    }
}

/**
 * Weighted Undiretional Graph 
 * @returns {Object}
 */
function Graph() {
    const nodes = {}

    function addNode(node) {
        if (!nodes[node]) {
            nodes[node] = Node(node)
        }
    }

    function addEdge(from, to, weight) {
        const fromNode = nodes[from]
        if (!fromNode) {
            throw new Error("Illegal from parameter")
        }
        const toNode = nodes[to]
        if (!toNode) {
            throw new Error("Illegal to parameter")
        }
        fromNode.addEdge(toNode, weight)
        toNode.addEdge(fromNode, weight)
    }

    /**
     * Get an array representation of the shortest path using Dikjstra's Algorithm
     * @param {string} from 
     * @param {string} to 
     * @returns {array}
     */
    function getShortestPath(from, to) {
        const fromNode = nodes[from]
        if (!fromNode) {
            throw new Error("Illegal from parameter")
        }
        const toNode = nodes[to]
        if (!toNode) {
            throw new Error("Illegal to parameter")
        }

        const distances = new Map()
        for (const [, node] of Object.entries(nodes)) {
            distances.set(node.id, Number.MAX_SAFE_INTEGER)
        }
        distances.set(fromNode.id, 0)

        const previousNodes = new Map()
        const visited = new Set()

        const queue = new PriorityQueue(comparator)
        queue.add(NodeEntry(fromNode, 0))

        while(!queue.isEmpty()) {
            let current = queue.remove().node
            visited.add(current)

            for (const edge of current.edges) {
                if (visited.has(edge.toNode)) {
                    continue
                }
                const newDistance = distances.get(current.id) + edge.weight
                if (newDistance < distances.get(edge.toNode.id)) {
                    distances.set(edge.toNode.id, newDistance);
                    previousNodes.set(edge.toNode.id, current);
                    queue.add(NodeEntry(edge.toNode, newDistance));
                }
            }
        }

        const stack = []
        stack.push(toNode)
        let previous = previousNodes.get(toNode.id)
        while (previous) {
            stack.push(previous)
            previous = previousNodes.get(previous.id)
        }

        const path = []
        while (stack.length > 0) {
            path.push(stack.pop().id)
        }

        return path
    }

    return {
        addNode,
        addEdge,
        getShortestPath,
        nodes
    }
}

/**
 * 
 * @param {Node} node 
 * @param {int} priority
 * @returns {Object}
 */
function NodeEntry(node, priority) {
    const _node = node
    const _priority = priority

    return {
        node: _node,
        priority: _priority
    }
}

function Node(id) {
    const _id = id
    const _edges = []

    function addEdge(toNode, weight) {
        _edges.push(new Edge(this, toNode, weight))
    }

    return {
        addEdge,
        id: _id,
        edges: _edges
    }
}

function Edge(fromNode, toNode, weight) {
    const _fromNode = fromNode
    const _toNode = toNode
    const _weight = weight

    return {
        fromNode: _fromNode,
        toNode: _toNode,
        weight: _weight
    }
}

export {
    Graph
}
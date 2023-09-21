"use strict";
/*## Homework Assignment: Data Structures and Algorithms in JavaScript

### Task

Your task is to demonstrate your knowledge of data structures (stack, queue, tree, graph, linked list) and implement algorithms to solve specific problems related to these data structures in JavaScript.

### Instructions

### Part 1: Data Structure Implementations

1. **Stack**: Implement a class for a stack data structure. Include methods for push, pop, and peek.
2. **Queue**: Implement a class for a queue data structure. Include methods for enqueue, dequeue, and peek.
3. **Binary Tree**: Implement a class for a binary tree data structure. Include methods for inserting nodes, searching for a node, and traversing the tree (e.g., in-order, pre-order, post-order).
4. **Graph**: Implement a class for a graph data structure. Include methods for adding vertices and edges, performing depth-first search (DFS), and breadth-first search (BFS).
5. **Linked List**: Implement a class for a singly linked list data structure. Include methods for inserting nodes, deleting nodes, and searching for a node.

### Part 2: Algorithmic Problems

1. **Min/Max Stack**: Implement a class for a stack that supports finding the minimum and maximum elements in constant time (O(1)). Include methods for push, pop, getMin, and getMax.
2. **Binary Search Tree**: Implement a function to determine if a binary tree is a binary search tree (BST). Provide an efficient algorithm that checks whether the tree satisfies the BST property.
3. **Graph Algorithms**: Implement algorithms to find the shortest path between two vertices in a graph using both Dijkstra's algorithm and Breadth-First Search (BFS).
4. **Linked List Cycle**: Implement a function to detect if a linked list has a cycle. Use Floyd's Cycle Detection Algorithm (Tortoise and Hare algorithm) to solve this problem efficiently.

### Part 3: Demonstration

1. **Usage Demonstration**: Create instances of your data structures and demonstrate their usage with sample data. Show how the algorithms you implemented can solve practical problems using these data structures.

### Part 4: Documentation

1. **Documentation**: Provide clear and concise comments and documentation for your code. Explain the purpose of each data structure, method, and algorithm. Describe how the algorithms work and their time complexity.

### Submission

Submit your JavaScript code along with detailed documentation and comments that explain your data structure implementations and algorithms. Ensure that your code is well-structured and adheres to best practices in data structures and algorithms.

### Example

Here's a simplified example structure to give you an idea of what your code might look like:

```jsx
class Stack {
  // Implement methods for push, pop, peek...
}

class Queue {
  // Implement methods for enqueue, dequeue, peek...
}

class BinaryTree {
  // Implement methods for inserting nodes, searching, traversing...
}

class Graph {
  // Implement methods for adding vertices, edges, DFS, BFS...
}

class LinkedList {
  // Implement methods for inserting, deleting, searching...
}

// Implement Min/Max Stack, Binary Search Tree, Graph Algorithms...
// Demonstrate usage and provide documentation...

```

## Bonus Homework Assignment: Implementing a Red-Black Tree

### Task

As a bonus challenge, you are tasked with implementing a Red-Black Tree data structure in JavaScript. Red-Black Trees are a type of self-balancing binary search tree. This exercise will deepen your understanding of tree structures and balancing algorithms.

### Instructions

1. **Red-Black Tree Implementation**: Create a class for a Red-Black Tree that includes methods for insertion, deletion, and searching. Implement the Red-Black Tree balancing rules to ensure that the tree remains balanced after each operation.
2. **Insertion**: Implement the insertion operation for the Red-Black Tree. Ensure that the tree maintains the Red-Black properties, including colorings and rotations as necessary.
3. **Deletion**: Implement the deletion operation for the Red-Black Tree. Handle cases for both removing nodes with no children, one child, and two children while preserving the Red-Black properties.
4. **Search**: Implement a method to search for a specific value in the Red-Black Tree. Ensure that the search operation is efficient and respects the tree's structure.

### Submission

Submit your JavaScript code for the Red-Black Tree implementation along with detailed comments and documentation explaining your implementation. Provide examples of inserting, deleting, and searching for values in the Red-Black Tree.
*/

//Part 1: Data Structure Implementations
/*----- Stack -----*/
class Stack {
  constructor() {
    //The constructor of the stack creates an empty array of items
    this.items = [];
  }

  //This method push an element onto the stack
  push(item) {
    this.items.push(item);
  }

  //This method remove and return the top element from the stack
  pop() {
    if (this.isEmpty()) {
      return null; // Stack is empty
    }
    return this.items.pop();
  }

  //This method return the top element without removing it
  peek() {
    if (this.isEmpty()) {
      return null; // Stack is empty
    }
    return this.items[this.items.length - 1];
  }

  //This method check if stack have any element
  isEmpty() {
    return this.items.length === 0;
  }
}

/*----- Queue -----*/
class Queue {
  constructor() {
    //The constructor of the queue creates an empty array of items
    this.items = [];
  }

  //This method add an element to the back of the queue
  enqueue(item) {
    this.items.push(item);
  }

  //This method remove and return the front element from the queue
  dequeue() {
    if (this.isEmpty()) {
      return null; // Queue is empty
    }
    return this.items.shift();
  }

  //This method return the front element without removing it
  peek() {
    if (this.isEmpty()) {
      return null; // Queue is empty
    }
    return this.items[0];
  }

  //This method check if queue have any element
  isEmpty() {
    return this.items.length === 0;
  }
}

/*----- BinaryTree -----*/
class TreeNode {
  constructor(value) {
    //Tree node constructor receive a value and put it in the value attribute, left and right initiate as null
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    //BinaryTree constructor only creates the root
    this.root = null;
  }

  //This method insert a value into the binary tree, if the root of the node is null, the value of the root is changed to the value received as parameter. If it's not, insertRecursive is called to find the correct place
  insert(value) {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
    } else {
      this._insertRecursive(this.root, newNode);
    }
  }

  getRoot() {
    //This method return the root node of the tree
    return this.root;
  }

  _insertRecursive(currentNode, newNode) {
    //insertRecurvise is a method that the class use for insert a node into the tree. The method works recursively. If the value of the new node is > than the current node, this method will find the place on the right side, if is lower, then will look for left side of the tree.
    if (newNode.value < currentNode.value) {
      if (currentNode.left === null) {
        currentNode.left = newNode;
      } else {
        this._insertRecursive(currentNode.left, newNode);
      }
    } else {
      if (currentNode.right === null) {
        currentNode.right = newNode;
      } else {
        this._insertRecursive(currentNode.right, newNode);
      }
    }
  }

  //This method search for a value in the binary tree
  search(value) {
    return this._searchRecursive(this.root, value);
  }

  _searchRecursive(currentNode, value) {
    //This method search recursively the value thats receive as parameter. If the root is null, return false,  that means the tree is empty, or the value doesn't exist in the tree. If still have values, this will continue searching.
    if (currentNode === null) {
      return false;
    }
    if (value === currentNode.value) {
      return true;
    }
    if (value < currentNode.value) {
      return this._searchRecursive(currentNode.left, value);
    }
    return this._searchRecursive(currentNode.right, value);
  }

  // In-order traversal of the binary tree (left, root, right)
  inOrderTraversal(callback) {
    this._inOrderRecursive(this.root, callback);
  }

  _inOrderRecursive(currentNode, callback) {
    //This method runs through the the tree, calling a function on each of the nodes. If the node is not null, then call recursively this function on the left, then the callback function (in this case a console.log of the node value), and then the right. The result is a print of the node values, in order
    if (currentNode !== null) {
      this._inOrderRecursive(currentNode.left, callback);
      callback(currentNode.value);
      this._inOrderRecursive(currentNode.right, callback);
    }
  }

  // Pre-order traversal of the binary tree (root, left, right)
  preOrderTraversal(callback) {
    this._preOrderRecursive(this.root, callback);
  }

  _preOrderRecursive(currentNode, callback) {
    //This method runs through the the tree, calling a function on each of the nodes. If the node is not null, then call the callback function (in this case a console.log of the node value) and then the left and right preOrderRecursive. The result is a print of the node values, the first time it pass trhough the node.
    if (currentNode !== null) {
      callback(currentNode.value);
      this._preOrderRecursive(currentNode.left, callback);
      this._preOrderRecursive(currentNode.right, callback);
    }
  }

  // Post-order traversal of the binary tree (left, right, root)
  postOrderTraversal(callback) {
    this._postOrderRecursive(this.root, callback);
  }

  _postOrderRecursive(currentNode, callback) {
    //This method runs through the the tree, calling a function on each of the nodes. If the node is not null,  first calls the left and right node preOrderRecursive, then call the callback function (in this case a console.log of the node value). The result is a print of the node values, but printing the last time it pass trhough the node.
    if (currentNode !== null) {
      this._postOrderRecursive(currentNode.left, callback);
      this._postOrderRecursive(currentNode.right, callback);
      callback(currentNode.value);
    }
  }
}

/*----- Graph -----*/
class Graph {
  constructor() {
    this.vertices = new Map(); // Map to store vertices and their neighbors
  }

  // Add a vertex to the graph
  addVertex(vertex) {
    if (!this.vertices.has(vertex)) {
      this.vertices.set(vertex, []); //For each vertex, we have an array wwith the edges of that vertex
    }
  }

  // Add an edge between two vertices
  addEdge(vertex1, vertex2) {
    if (this.vertices.has(vertex1) && this.vertices.has(vertex2)) {
      this.vertices.get(vertex1).push(vertex2);
      this.vertices.get(vertex2).push(vertex1); // For an undirected graph
    }
  }

  // Depth-First Search (DFS) starting from a given vertex
  dfs(startingVertex, visitCallback) {
    const visited = new Set();
    this._dfsRecursive(startingVertex, visited, visitCallback);
  }

  _dfsRecursive(vertex, visited, visitCallback) {
    //This method runs through the graph. It works recursively, finding the path between all the vertex. This method use a set: visited will store all the visited vertex not to add them to the path again.
    visited.add(vertex);
    visitCallback(vertex);
    for (const neighbor of this.vertices.get(vertex)) {
      if (!visited.has(neighbor)) {
        this._dfsRecursive(neighbor, visited, visitCallback);
      }
    }
  }

  // Breadth-First Search (BFS) starting from a given vertex
  bfs(startingVertex, visitCallback) {
    //This method runs through the graph. It works iteratively, finding the path between all the vertex. This method use a set: visited will store all the visited vertex not to add them to the path again. The diference wwith dfs is that bfs search in the whole level of the actual vertex.
    const visited = new Set();
    const queue = [startingVertex];
    visited.add(startingVertex);

    while (queue.length > 0) {
      const vertex = queue.shift();
      visitCallback(vertex);

      for (const neighbor of this.vertices.get(vertex)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }

  dijkstra(startVertex, endVertex) {
    //Dijkstra is an algorithm that will search the shortest path between two vertex in a labeled Graph. In this case, the dijkstra algorithm is used to find the short path but in a unlabeled graph, to simplify the example. We asume all edges have weight 1.
    const distances = new Map();
    const visited = new Set();
    const previous = new Map();

    // Initialize distances with Infinity for all vertices except the start vertex
    for (const vertex of this.vertices.keys()) {
      distances.set(vertex, Infinity);
    }
    distances.set(startVertex, 0);

    while (visited.size < this.vertices.size) {
      const currentVertex = this.getMinDistanceVertex(distances, visited);
      visited.add(currentVertex);

      for (const neighbor of this.vertices.get(currentVertex)) {
        const distanceFromStart = distances.get(currentVertex) + 1; // Assuming all edges have weight 1

        if (distanceFromStart < distances.get(neighbor)) {
          distances.set(neighbor, distanceFromStart);
          previous.set(neighbor, currentVertex);
        }
      }
    }

    // Reconstruct the shortest path
    const shortestPath = this.reconstructPath(startVertex, endVertex, previous);

    return shortestPath;
  }

  reconstructPath(startVertex, endVertex, previous) {
    const path = [];
    let currentVertex = endVertex;

    while (currentVertex !== startVertex) {
      path.unshift(currentVertex);
      currentVertex = previous.get(currentVertex);
    }

    path.unshift(startVertex);
    return path;
  }

  getMinDistanceVertex(distances, visited) {
    let minDistance = Infinity;
    let minVertex = null;

    for (const [vertex, distance] of distances) {
      if (!visited.has(vertex) && distance < minDistance) {
        minDistance = distance;
        minVertex = vertex;
      }
    }

    return minVertex;
  }

  bfsShortestPath(startVertex, endVertex) {
    //This method will find the shortest path iteratively, just counting the number of edges between two vertex in a graph.
    const queue = [{ vertex: startVertex, path: [startVertex] }];
    const visited = new Set([startVertex]);

    while (queue.length > 0) {
      const { vertex, path } = queue.shift();

      if (vertex === endVertex) {
        return path;
      }

      for (const neighbor of this.vertices.get(vertex)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push({ vertex: neighbor, path: [...path, neighbor] });
        }
      }
    }

    return [];
  }
}

/*----- LinkedList -----*/
class Node {
  //The Node class is used to create the node in the list. Nodes only have a data, and a next node that he pointing to.
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  //Linked list is a list of nodes, and only have a head in the constructor, initialitated as null.
  constructor() {
    this.head = null;
  }

  //This method insert a new node at the end of the linked list
  append(data) {
    //Runs through the structure until the end (next is null) and put it in the last place. If the head is null, the node is placed.
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  //This method delete the first node with the given data. Runs through the list. It will stop if the data is finded or if doesn't exist in the list.
  delete(data) {
    if (!this.head) {
      return;
    }

    if (this.head.data === data) {
      //Delete if the data is equal to the head
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }

  //This method search for a node with the given data and return it if found.
  find(data) {
    let current = this.head;
    while (current) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  //This method print the linked list
  print() {
    let current = this.head;
    const result = [];
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    console.log(result.join(" -> "));
  }

  createCycle() {
    //This method create a cycle. I used it for testings
    if (!this.head) return;
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = this.head;
  }

  //This method detect if the linked list has a cycle using Floyd's Algorithm. This algorithm is a pointer algorithm that uses only two pointers, moving through the sequence at diferent speeds. The fast pointer may reach the end, this shows that there is no loop in the list.
  hasCycle() {
    if (!this.head || !this.head.next) return false;
    let slow = this.head;
    let fast = this.head;
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
      if (slow === fast) {
        return true;
      }
    }
    return false;
  }
}

//Part 2: Algorithmic Problems

//**Min/Max Stack**
class MinMaxStack {
  //This class uses three separates stacks for the actual CSSFontFeatureValuesRule, one to keep track of the minimun CSSFontFeatureValuesRule, and other to keep maximum values. The methods ensure that the values are always up to date
  constructor() {
    this.stack = [];
    this.minStack = [];
    this.maxStack = [];
  }

  push(value) {
    this.stack.push(value);

    // For minimum values
    if (
      this.minStack.length === 0 ||
      value <= this.minStack[this.minStack.length - 1]
    ) {
      this.minStack.push(value);
    }

    // For maximum values
    if (
      this.maxStack.length === 0 ||
      value >= this.maxStack[this.maxStack.length - 1]
    ) {
      this.maxStack.push(value);
    }
  }

  pop() {
    if (this.stack.length === 0) {
      return undefined;
    }

    const poppedValue = this.stack.pop();

    if (poppedValue === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }

    if (poppedValue === this.maxStack[this.maxStack.length - 1]) {
      this.maxStack.pop();
    }

    return poppedValue;
  }

  getMin() {
    if (this.minStack.length === 0) {
      return undefined;
    }

    return this.minStack[this.minStack.length - 1];
  }

  getMax() {
    if (this.maxStack.length === 0) {
      return undefined;
    }

    return this.maxStack[this.maxStack.length - 1];
  }
}

//**Binary Search Tree**
function isBST(node, min = null, max = null) {
  // This method will check if a binary three is a BST. A BST is a BT that is ordered left to right, ordered from smallest to largest values of the node. For example if the root is 10, and i want to add a 5, this value will be placed to the left subtree.
  if (node === null) {
    return true; // An empty tree is a BST.
  }

  // Check if the current node's value is within the valid range.
  if (
    (min !== null && node.value <= min) ||
    (max !== null && node.value >= max)
  ) {
    return false;
  }

  //This method ecursively checks the left and right subtrees.
  return (
    isBST(node.left, min, node.value) && // For the left subtree, the maximum value is the current node's value.
    isBST(node.right, node.value, max) // For the right subtree, the minimum value is the current node's value.
  );
}

//**Graph Algorithms**
function dijkstra(startVertex, endVertex) {
  //dijkstra algorithm is implemented on Graph Class
}

function bfsShortestPath(graph, startVertex, endVertex) {
  //bfsShortestPath is implemented of Graph Class
}

//**Linked List Cycle**
//The function was implemented the Linked List class

//Part 3: Demonstration
//Stack Demonstration
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log("Top of the stack:", stack.peek()); //Expected Output: 3
stack.pop(); // Remove the top element
console.log("After popping, top of the stack:", stack.peek()); //Expected Output: 2
console.log("Is the stack empty after clearing?", stack.isEmpty()); //Checking if the stack is empty, expected output: false

//Here i created a minMaxStack and add some values to it
const minMaxStack = new MinMaxStack();
minMaxStack.push(2);
minMaxStack.push(4);
minMaxStack.push(1);
minMaxStack.push(5);
minMaxStack.push(6);
minMaxStack.push(15);

console.log("Minimum:", minMaxStack.getMin()); //Expected Minimum: 1
console.log("Maximum:", minMaxStack.getMax()); //Expected Maximum: 15

minMaxStack.pop();

console.log("Minimum after pop:", minMaxStack.getMin()); //Expected Minimum after pop: 1
console.log("Maximum after pop:", minMaxStack.getMax()); //Expected Maximum after pop: 6

//Queue Demonstration
//Creating a queue
const queue = new Queue();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log("Front of the queue:", queue.peek()); //Expected Output: 1
queue.dequeue(); // Remove the front element
console.log("After dequeuing, front of the queue:", queue.peek()); //Expected Output: 2
console.log("Is the queue empty after clearing?", queue.isEmpty()); //Checking if the queue is empty, expected output: false

//BinaryTree Demonstration
//I created a tree, and add some values
const tree = new BinaryTree();
tree.insert(5);
tree.insert(3);
tree.insert(7);
tree.insert(2);
tree.insert(4);
tree.insert(6);
tree.insert(8);
tree.insert(10);
//Printing the tree in order, pre order and post order
console.log("In-order:");
tree.inOrderTraversal((value) => console.log(value));
console.log("Pre-order:");
tree.preOrderTraversal((value) => console.log(value));
console.log("Post-order:");
tree.postOrderTraversal((value) => console.log(value));
//Searching for values
console.log("Search for 4:", tree.search(4)); // Expected : true
console.log("Search for 15:", tree.search(15)); //Expected: false

//BST test
//Checking if the tree is a BST
console.log("The tree is a BST:" + isBST(tree.getRoot()));

//Graph Demonstration
//I created a graph and a few vertex with leters.
const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addVertex("H");

//Here i created the edges between the vertex
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("C", "F");
graph.addEdge("F", "H");
graph.addEdge("F", "A");

//Checking the full path of the vertex with both algorightms
console.log("DFS starting from A:");
graph.dfs("A", (vertex) => console.log(vertex));
console.log("BFS starting from A:");
graph.bfs("A", (vertex) => console.log(vertex));

//Finding shortest path with BFS and Dijkstra
console.log("Shortest path using Dijkstra:", graph.dijkstra("A", "H"));
console.log("Shortest path using BFS:", graph.bfsShortestPath("A", "H"));

//LinkedList Demonstration
//Here i created a Linked List and some nodes
const linkedList = new LinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(4);
linkedList.append(5);
linkedList.append(10);
linkedList.append(15);

console.log("Linked List:");
linkedList.print();
linkedList.delete(3);
linkedList.delete(10);
linkedList.delete(1);
console.log("After deleting:");
linkedList.print();

console.log(linkedList.hasCycle()); // Expected Output: false

linkedList.createCycle(); //Here i create a cycle for testing
console.log(linkedList.hasCycle()); // Expected Output: true

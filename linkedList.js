// Node factory
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// Linked List factory
export default class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Add node to end of list
    append(value) {
        const newNode = new Node(value);

        // If no head, node becomes head and tail
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Put node after tail and link new tail
            this.tail.next = newNode;
            this.tail = newNode;
        }
        
        this.size++;
    }

    // Add node to beginning of list
    prepend(value) {
        const newNode = new Node(value);

        // If no head, node becomes new head and tail
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Put node before head and link new head
            newNode.next = this.head;
            this.head = newNode;
        }

        this.size++;
    }

    // Changed names of size head and tail function cause ide messing up the colors
    getSize() {
        return this.size;
    }

    getHead() {
        return this.head;
    }

    getTail() {
        return this.tail;
    }

    // Returns node at given index
    at(index) {
        if (!this.head) {
            return null;
        }
        if (index < 0 || index > this.size) {
            return "Invalid index";
        }

        // Iterate through list
        let currentNode = this.head;
        for(let i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }

        return currentNode;
    }

    // Removes last node
    pop() {
        // Return if list is empty
        if(!this.size) {
            return null;
        }
        if (this.size === 1) {
            // Remove only node if size is 1
            this.head = null;
            this.tail = null;
            this.size = 0;
        }
        // Loop through to find second last element
        let currentNode = this.head; //Start at head

        // Traverse to second last node
        while (currentNode.next !== this.tail) {
            currentNode = currentNode.next;
        }

        currentNode.next = null;
        this.tail = currentNode;
        this.size--;
    }

    // Return true if value is in the list
    contains(value) {
        if(!this.head) {
            return false;
        } 

        let currentNode = this.head;

        // Iterate through linked list
        while (currentNode !== null) {
            if (currentNode.value === value) {
                return true;
            }   
            currentNode = currentNode.next;
        }

        return false;
    }

    // Return index of node containing value, return null if not found
    find(value) {
        if(!this.head) {
            return null;
        }

        let currentNode = this.head;
        let index = 0;
        while(currentNode !== null) {
            if (currentNode.value === value) {
                return index;
            }
            currentNode = currentNode.next;
            index++;
        }

        return null;
    }

    toString() {
        let stringToPrint = '';

        let currentNode = this.head;
        while (currentNode !== null) {
            stringToPrint += `(${currentNode.value}) -> `;
            currentNode = currentNode.next;
        };

        console.log(stringToPrint + 'null');
    }

    insertAt (value, index) {
        if (index < 0 || index > this.size){
            return "Invalid index";
        }

        const newNode = new Node(value);
        // If only 1 node replace head and existing head to tail
        if (index === 0) {
            if(!this.head){
                this.head = newNode;
                this.tail = newNode;
            } else 
            newNode.next = this.head;
            this.head = newNode;

            this.size++;
            return;
        }

        let currentNode = this.head;
        // Traverse to the node before index
        for (let i = 0; i < index - 1; i++) {
            currentNode = currentNode.next;
        }
        // Shift previously assigned index to after new node
        newNode.next = currentNode.next;
        currentNode.next = newNode;

        // Check if newnode is last node
        if (newNode.next === null){
            this.tail = newNode;
        }
        
        this.size++;
        return;
    }

    removeAt(index){
        if (index < 0 || index >= this.size) {
            return "Invalid index";
        }

        if (index === 0){
            this.head = this.head.next;
            if (!this.head){
                this.tail = null;
            }
            // Mistake made redundant code
            // if (this.size === 1) {
            //     this.head = null;
            //     this.tail = null;
            //     this.size = 0;
            // }

            this.size--;
            return;
        }
        
        let currentNode = this.head;
        // Traverse to node before index
        for(let i = 0; i < index - 1; i++) {
            currentNode = currentNode.next;
        }
        
        const nodeToRemove = currentNode.next;
        currentNode.next = nodeToRemove.next;


        // If removed node was previous last node
        if (currentNode.next === null) {
            this.tail = currentNode;
            this.tail.next = null;
        }

        this.size--;
        return
    }
}


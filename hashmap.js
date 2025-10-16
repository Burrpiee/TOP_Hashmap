 import LinkedList from "./linkedList";
 
 export default class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = capacity;
        this.capacity = loadFactor;
        this.buckets = new Array(capacity);
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.length;
        }

        return hashCode;
    }

    set(key, value) {
        // Ensure key is string
        if (typeof key !== 'string') {
            throw new Error ("Only strings allowed");
        }

        const index = this.hash(key); // Generate hashcode of key
        this.checkIndex(index); //Check if index is within bounds

        // Create bucket if does not exist
        if (!this.buckets[index]) {
            this.buckets[index] = new LinkedList();
            this.buckets[index].append({key, value});
            this.size++;

            //Load factor check
            return;
        }

        // Check if update is needed from collision
        const bucket = this.buckets[index];
        let currentNode = bucket.head;
        while (currentNode !== null) {
            if (currentNode.value.key === key) {
                currentNode.value.value = value;
                return;
            }
            currentNode = currentNode.next;
        }

        bucket.append({key,value});
        this.size++;
    }

    get(key) {
        if (typeof key !== 'string') return null;

        const index = this.hash(key);
        this.checkIndex(index);

        const bucket = this.buckets[index];
        if (!bucket) return null;

        let currentNode = bucket.head;
        while (currentNode !== null) {
            if (currentNode.value && currentNode.value.key === key) {
                return currentNode.value.value;
            }
            currentNode = currentNode.next;
        }

        return null;
    }

    has(key) {
        if (typeof key !== 'string') return false;

        const index = this.hash(index);
        this.checkIndex(index);

        const bucket = this.buckets[index];
        if (!bucket) return false;

        let currentNode = bucket.head;
        while(currentNode !== null) {
            if (currentNode.value.key === key) return true;
            currentNode = currentNode.next;
        }

        return false;
    }

    remove(key) {
        if (typeof key !== 'string') return false;

        const index = this.hash(key);
        this.checkIndex(index);

        const bucket = this.buckets[index];
        if (!bucket) return false;

        let currentNode = bucket.head;
        let linkedListIndex = 0;
        while (currentNode !== null) {
            if (currentNode.value.key === key) {
                bucket.removeAt(linkedListIndex);
                this.size--;

                // Clean up bucket
                if (bucket.head = null) {
                    this.buckets[index] = null;
                }

                return true;
            }
            currentNode = currentNode.next;
            linkedListIndex++;
        }

        return false;
    }

    // Check whether index is valid as part of project spec
    checkIndex(index) {
        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
    }

    // Check if hashmap needs to be expanded
    checkLoad() {
        if (this.capacity * this.loadFactor < this.size) {
            // Use entries to iterate

        }
    }
}
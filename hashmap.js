 import LinkedList from "./linkedList";
 
 export default class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.buckets = Array(capacity).fill(null);
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return Math.abs(hashCode);
    }

    set(key, value) {
        // Ensure key is string
        if (typeof key !== 'string') {
            throw new Error ("Only strings allowed");
        }

        const index = this.hash(key); // Generate hash code of key
        this.checkIndex(index); //Check if index is within bounds

        // Create bucket if does not exist
        if (!this.buckets[index]) {
            this.buckets[index] = new LinkedList();
            this.buckets[index].append([key, value]); //Key is indexed 0, value is indexed 1
            this.size++;

            this.checkLoad();
            return;
        }

        // Check if update is needed from collision
        const bucket = this.buckets[index];
        let currentNode = bucket.head;
        while (currentNode !== null) {
            if (currentNode.value[0] === key) {
                currentNode.value[1] = value;
                return;
            }
            currentNode = currentNode.next;
        }

        bucket.append([key, value]);
        this.size++;

        this.checkLoad();
    }

    get(key) {
        if (typeof key !== 'string') return null;

        const index = this.hash(key);
        this.checkIndex(index);

        const bucket = this.buckets[index];
        if (!bucket) return null;

        let currentNode = bucket.head;
        while (currentNode !== null) {
            if (currentNode.value && currentNode.value[0] === key) {
                return currentNode.value[1];
            }
            currentNode = currentNode.next;
        }

        return null;
    }

    has(key) {
        if (typeof key !== 'string') return false;

        const index = this.hash(key);
        this.checkIndex(index);

        const bucket = this.buckets[index];
        if (!bucket) return false;

        let currentNode = bucket.head;
        while(currentNode !== null) {
            if (currentNode.value[0] === key) return true;
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
            if (currentNode.value[0]=== key) {
                bucket.removeAt(linkedListIndex);
                this.size--;

                // Clean up bucket
                if (bucket.head === null) {
                    this.buckets[index] = null;
                }

                return true;
            }
            currentNode = currentNode.next;
            linkedListIndex++;
        }

        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = Array(this.capacity).fill(null);
        this.size = 0;
    }

    keys() {
        const array = [];

        for (const bucket of this.buckets) {
            if (!bucket) continue;

            if (bucket instanceof LinkedList) {
                let currentNode = bucket.head;
                while (currentNode) {
                    array.push(currentNode.value[0]);
                    currentNode = currentNode.next;
                }
            }
        }

        return array;
    }

    values() {
        const array = [];

        for (const bucket of this.buckets) {
            if (!bucket) continue;

            if(bucket instanceof LinkedList) {
                let currentNode = bucket.head;
                while (currentNode) {
                    array.push(currentNode.value[1]);
                    currentNode = currentNode.next;
                }
            }
        }

        return array;
    }

    entries() {
        const array = [];

        for (const bucket of this.buckets) {
            if (!bucket) continue;

            if (bucket instanceof LinkedList) {
                let currentNode = bucket.head;
                while (currentNode) {
                    array.push(currentNode.value);
                    currentNode = currentNode.next;
                }
            }
        }

        return array;
    }

    // Check whether index is valid as part of project spec
    checkIndex(index) {
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
    }

    // Check if hashmap needs to be expanded
    checkLoad() {
        if (this.capacity * this.loadFactor < this.size) {
            let oldEntries = this.entries();

            this.capacity *= 2;
            this.buckets = Array(this.capacity).fill(null);
            this.size = 0;  

            for (const [key, value] of oldEntries) {
                this.set(key, value);
            }
        }
    }
}
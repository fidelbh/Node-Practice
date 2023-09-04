/*Task 1: Advanced Array Filtering

1. Create a function called `customFilterUnique` that takes an array and a callback function as arguments. The `customFilterUnique` function should filter the array using the callback function to determine uniqueness. The resulting array should contain only unique elements based on the callback's logic.

2. Use the `customFilterUnique` function to filter an array of objects based on a specific property and return only unique objects.

Task 2: Array Chunking

1. Create a function called `chunkArray` that takes an array and a chunk size as arguments. The `chunkArray` function should divide the array into smaller arrays, each containing elements of the specified chunk size. The function should return an array of arrays.

2. Optimize the `chunkArray` function to minimize memory usage while chunking the array.

Task 3: Array Shuffling

1. Create a function called `customShuffle` that takes an array as an argument and returns a new array with its elements randomly shuffled.

2. Implement the `customShuffle` function using an efficient shuffling algorithm to achieve uniform randomness.

Task 4: Array Intersection and Union

1. Create a function called `getArrayIntersection` that takes two arrays as arguments and returns a new array containing the common elements between the two arrays.

2. Create a function called `getArrayUnion` that takes two arrays as arguments and returns a new array containing all unique elements from both arrays, without any duplicates.

Task 5: Array Performance Analysis

1. Implement a function called `measureArrayPerformance` that takes a function and an array as arguments. The `measureArrayPerformance` function should execute the provided function with the given array as input and measure the execution time.

2. Use the `measureArrayPerformance` function to compare the performance of built-in array methods (`map`, `filter`, `reduce`, etc.) against your custom array manipulation functions.*/

//Task 1
function customFilterUnique(array, callback) {
  const unique = new Set();
  const result = [];

  for (const item of array) {
    const key = callback(item);
    if (!unique.has(key)) {
      unique.add(key);
      result.push(item);
    }
  }

  return result;
}
const nameCallback = (item) => item.name;
const arrayOfObjects = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "John" },
  { id: 4, name: "Alice" },
  { id: 5, name: "Fidel" },
  { id: 6, name: "Fidel" },
  { id: 7, name: "Armando" },
];

const uniqueObjects = customFilterUnique(arrayOfObjects, nameCallback);
// console.log(uniqueObjects);

//Task 2
function chunkArray(array, chunkSize) {
  const result = [];
  let index = 0;

  while (index < array.length) {
    result.push(array.slice(index, index + chunkSize));
    index += chunkSize;
  }

  return result;
}

const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 25];
// console.log(chunkArray(originalArray, 3));

//Task 3
function customShuffle(array) {
  const shuffledArr = array.slice();

  for (let i = 0; i < shuffledArr.length; i++) {
    let randomI = Math.floor(Math.random() * (i + 1));
    const temp = shuffledArr[i];
    shuffledArr[i] = shuffledArr[randomI];
    shuffledArr[randomI] = temp;
  }
  return shuffledArr;
}

const originalArray2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 25, 12, 45];
// console.log(customShuffle(originalArray2));

//Task 4
function getArrayIntersection(arr1, arr2) {
  const intersection = [];
  for (const element of arr1) {
    if (arr2.includes(element)) {
      intersection.push(element);
    }
  }
  return intersection;
}
function getArrayUnion(arr1, arr2) {
  const union = new Set([...arr1, ...arr2]);
  return union;
}
const array1 = [1, 2, 3, 4, 5, 10, 11];
const array2 = [3, 4, 5, 6, 7, 9, 10, 15];
// console.log(getArrayIntersection(array1, array2));
// console.log(getArrayUnion(array1, array2));

//Task 5
function measureArrayPerformance(funct, arr) {
  const startTime = Date.now();
  funct(arr);
  const endTime = Date.now();
  return endTime - startTime;
}

function customFilter(arr) {
  return arr.filter((item) => item % 2 === 0);
}

function customMap(arr) {
  return arr.map((item) => item * 2);
}

function customReduce(arr) {
  return arr.reduce((sum, item) => sum + item, 0);
}

const exampleArray = Array.from({ length: 1000000 }, (_, index) => index + 1);

// Measure performance of built-in methods
const mapTime = measureArrayPerformance(
  () => exampleArray.map((item) => item * 2),
  exampleArray
);
const filterTime = measureArrayPerformance(
  () => exampleArray.filter((item) => item % 2 === 0),
  exampleArray
);
const reduceTime = measureArrayPerformance(
  () => exampleArray.reduce((sum, item) => sum + item, 0),
  exampleArray
);

// Measure performance of custom methods
const customMapTime = measureArrayPerformance(customMap, exampleArray);
const customFilterTime = measureArrayPerformance(customFilter, exampleArray);
const customReduceTime = measureArrayPerformance(customReduce, exampleArray);

// console.log(`Built-in map time: ${mapTime}ms`);
// console.log(`Custom map time: ${customMapTime}ms`);

// console.log(`Built-in filter time: ${filterTime}ms`);
// console.log(`Custom filter time: ${customFilterTime}ms`);

// console.log(`Built-in reduce time: ${reduceTime}ms`);
// console.log(`Custom reduce time: ${customReduceTime}ms`);

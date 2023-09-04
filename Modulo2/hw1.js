"use strict";
//Sort algorithms implementation
function bubbleSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

//array generate functions
function generateSortedArray(length) {
  const arr = [];
  for (let i = 1; i <= length; i++) {
    arr.push(i);
  }
  return arr;
}

function generateSortedBackwardArray(length) {
  const arr = [];
  for (let i = length; i >= 1; i--) {
    arr.push(i);
  }
  return arr;
}

function generateRandomArray(length) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * length) + 1);
  }
  return arr;
}

//time measure function and array generate
function measureExecutionTime(sortFunction, arrayType, arrayLength) {
  const array = generateArray(arrayType, arrayLength); // Implement this function

  const startTime = performance.now();
  sortFunction(array);
  const endTime = performance.now();

  return endTime - startTime;
}

function generateArray(arrayType, lenght) {
  if (arrayType === "sorted") {
    return generateSortedArray(lenght);
  } else if (arrayType === "sortedBackward") {
    return generateSortedBackwardArray(lenght);
  } else if (arrayType === "random") {
    return generateRandomArray(lenght);
  }
}

const arrayTypes = ["sorted", "sortedBackward", "random"];

//test and results
const arrayLengths = [2, 5, 10, 20, 50, 100, 150];
const header = "Array Length  | QuickSort  | BubbleSort  | Merge Sort";
console.log(header);

for (const arrayType of arrayTypes) {
  for (const arrayLength of arrayLengths) {
    const quickSortTime = measureExecutionTime(
      quickSort,
      arrayType,
      arrayLength
    ).toFixed(3);
    const bubbleSortTime = measureExecutionTime(
      bubbleSort,
      arrayType,
      arrayLength
    ).toFixed(3);
    const mergeSortTime = measureExecutionTime(
      mergeSort,
      arrayType,
      arrayLength
    ).toFixed(3);

    const rowData = `${arrayLength
      .toString()
      .padEnd(12)} | ${quickSortTime.padEnd(13)} | ${bubbleSortTime.padEnd(
      15
    )} | ${mergeSortTime.padEnd(13)}`;
    console.log(rowData);
    if (quickSortTime < bubbleSortTime && mergeSortTime < bubbleSortTime) {
      console.log(
        `QuickSort and MergeSort consistently outperform BubbleSort at length ${arrayLength}, in ${arrayType} array`
      );
    }
  }
}

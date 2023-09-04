"use strict";
/*Task 1: Immutability and Pure Functions

1. Implement a pure function called `calculateDiscountedPrice` that takes an array of products and a discount percentage as arguments. The function should return a new array of products with discounted prices based on the given percentage, without modifying the original products.

2. Create a pure function called `calculateTotalPrice` that takes an array of products as an argument. The function should return the total price of all products, without modifying the original array or its items.

Task 2: Function Composition and Point-Free Style

1. Implement a function called `getFullName` that takes a person object with `firstName` and `lastName` properties. The function should return the person's full name in the format "FirstName LastName".

2. Create a function called `filterUniqueWords` that takes a string of text and returns an array of unique words, sorted in alphabetical order, without using explicit loops. Use function composition and point-free style.

3. Implement a function called `getAverageGrade` that takes an array of student objects, each containing a `name` and `grades` property. The function should return the average grade of all students, without modifying the original array or its items. Use function composition and point-free style.

Task 3: Closures and Higher-Order Functions

1. Create a function called `createCounter` that returns a closure. The closure should be a counter function that increments the count on each call and returns the updated count. Each closure should have its own independent count.

2. Implement a higher-order function called `repeatFunction` that takes a function and a number as arguments. The function should return a new function that invokes the original function multiple times based on the provided number. If the number is negative, the new function should invoke the original function indefinitely until stopped.

Task 4: Recursion and Tail Call Optimization

1. Implement a recursive function called `calculateFactorial` that calculates the factorial of a given number. Optimize the function to use tail call optimization to avoid stack overflow for large input numbers.

2. Create a recursive function called `power` that takes a base and an exponent as arguments. The function should calculate the power of the base to the exponent using recursion.

Task 5: Lazy Evaluation and Generators

1. Implement a lazy evaluation function called `lazyMap` that takes an array and a mapping function. The function should return a lazy generator that applies the mapping function to each element of the array one at a time.

2. Create a lazy generator function called `fibonacciGenerator` that generates Fibonacci numbers one at a time using lazy evaluation.
*/
//Task 5 should be implemented without yield

///////// TASK 1
//1)
const calculateDiscountedPrice = function (products, discountPercentage) {
  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new Error("Invalid discount percentage");
  }
  const discounted = products.map((product) => {
    const newPrice = product.price - product.price * (discountPercentage / 100);
    return { ...product, price: newPrice };
  });
  return discounted;
};

//2)
const calculateTotalPrice = function (products) {
  let total = 0;
  for (const p of products) {
    total += p.price;
  }
  return total;
};

//////  Task 2
//1)
const getFullName = (person) => `${person.firstName} ${person.lastName}`;
//2
const filterUniqueWords = (text) =>
  text
    .toLowerCase()
    .split(" ")
    .filter((word, index, words) => words.indexOf(word) === index)
    .sort();
//3
const getAverageGrade = function (students) {
  const averages = students.map((student) => {
    let total = 0;
    for (const grade of student.grades) {
      total += grade;
    }
    const averageGrade = total / student.grades.length;
    return { ...student, grades: averageGrade };
  });
  return averages;
};

////// Task 3
//1)
const createCounter = function () {
  let count = 0;
  const counter = () => {
    count++;
    return count;
  };
  return counter;
};
//2)
const repeatFunction = function (funct, num) {
  if (num < 0) {
    return () => {
      while (true) {
        funct();
      }
    };
  } else {
    return () => {
      for (let i = 0; i < num; i++) {
        funct();
      }
    };
  }
};

////// Task 4
//1)
const calculateFactorial = function (n, result = 1) {
  if (n === 0) {
    return result;
  } else {
    return calculateFactorial(n - 1, result * n);
  }
};
//2)
const power = function (base, exponent) {
  {
    if (exponent === 0) {
      return 1;
    } else {
      return base * power(base, exponent - 1);
    }
  }
};

////// Task 5
//1)
const lazyMap = function (array, mappingFunction) {
  let i = 0;
  return {
    next: function () {
      if (i >= array.length) {
        return { isDone: true };
      }
      const mappedValue = mappingFunction(array[i]);
      i++;
      return { value: mappedValue, isDone: false };
    },
  };
};
//2)
const fibonacciGenerator = function () {
  let previous = 0;
  let current = 1;
  return {
    next: function () {
      const nextValue = previous;
      const sum = previous + current;
      previous = current;
      current = sum;
      return { value: nextValue, isDone: false };
    },
  };
};

// const products = [
//   { name: "product 1", price: 100 },
//   { name: "product 2", price: 50 },
//   { name: "product 3", price: 75 },
// ];
// const discountedProducts = calculateDiscountedPrice(products, 10);
// console.log(discountedProducts);

// const total = calculateTotalPrice(products);
// console.log(total);
const text = "hello world Hello World average Average Canut canut dashboard";
const uniqueWords = filterUniqueWords(text);
console.log(uniqueWords);
// const counter1 = createCounter();
// console.log(counter1()); // Output: 1
// console.log(counter1()); // Output: 2

// const counter2 = createCounter();
// console.log(counter2());
// console.log(counter1());
//console.log(calculateFactorial(5));
//console.log(power(2, 4));
// const numbers = [1, 2, 3, 4, 5];
// const mappingFn = (num) => num * 2;

// const lazyMappedValues = lazyMap(numbers, mappingFn);

// console.log(lazyMappedValues.next().value); // Output: 2
// console.log(lazyMappedValues.next().value); // Output: 4
// console.log(lazyMappedValues.next().value); // Output: 6
// console.log(lazyMappedValues.next().value); // Output: 8
// console.log(lazyMappedValues.next().value); // Output: 10
// console.log(lazyMappedValues.next().isDone);
// const fibonacci = fibonacciGenerator();
// console.log(fibonacci.next().value); // Output: 0
// console.log(fibonacci.next().value); // Output: 1
// console.log(fibonacci.next().value); // Output: 1
// console.log(fibonacci.next().value); // Output: 2
// console.log(fibonacci.next().value); // Output: 3
// console.log(fibonacci.next().value);
// console.log(fibonacci.next().value);
// console.log(fibonacci.next().value);
// console.log(fibonacci.next().value);

const students = [
  { name: "Fidel", grades: [40, 20, 64] },
  { name: "Emi", grades: [450, 210, 64] },
  { name: "Flor", grades: [10, 20, 64] },
];
console.log(getAverageGrade(students));

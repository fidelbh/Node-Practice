"use strict";
function stringPlus(a, b) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  if (!isNaN(numA) && !isNaN(numB)) {
    return (numA + numB).toString();
  } else {
    throw new Error("Invalid input.");
  }
}

function stringivide(a, b) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  if (!isNaN(numA) && !isNaN(numB)) {
    return (numA - numB).toString();
  } else {
    throw new Error("Invalid input.");
  }
}

function stringDivide(a, b) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  if (!isNaN(numA) && !isNaN(numB) && numB !== 0) {
    return (numA / numB).toString();
  } else {
    throw new Error("Invalid input.");
  }
}

function stringMultiply(a, b) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  if (!isNaN(numA) && !isNaN(numB)) {
    return (numA * numB).toString();
  } else {
    throw new Error("Invalid input. ");
  }
}

console.log(stringPlus("1", "2323"));

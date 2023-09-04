"use strict";
const DataTransformationLibrary = {
  addValues: function (arg1, arg2) {
    if (typeof arg1 === "number" && typeof arg2 === "number") {
      return arg1 + arg2;
    } else if (typeof arg1 === "string" && typeof arg2 === "string") {
      return arg1 + arg2;
    } else {
      throw new Error("Addition is not possible.");
    }
  },

  stringifyValue: function (value) {
    if (typeof value === "object" || Array.isArray(value)) {
      return JSON.stringify(value);
    } else {
      return value.toString();
    }
  },

  invertBoolean: function (value) {
    if (typeof value === "boolean") {
      return !value;
    } else {
      throw new Error("Input value is not a boolean.");
    }
  },

  convertToNumber: function (value) {
    if (typeof value === "string") {
      const numberValue = parseFloat(value);
      if (!isNaN(numberValue)) {
        return numberValue;
      }
    } else if (typeof value === "boolean") {
      return value ? 1 : 0;
    } else if (typeof value === "object") {
      const keys = Object.keys(value);
      if (keys.length === 1 && !isNaN(Number(keys[0]))) {
        return Number(keys[0]);
      }
    }

    throw new Error("Conversion to number is not possible.");
  },

  coerceToType: function (value, type) {
    switch (type) {
      case "number":
        return this.convertToNumber(value);
      case "boolean":
        if (typeof value === "boolean") {
          return value;
        } else if (typeof value === "string") {
          if (value.toLowerCase() === "true") {
            return true;
          } else if (value.toLowerCase() === "false") {
            return false;
          }
        }
        break;
      case "string":
        return this.stringifyValue(value);
      default:
        throw new Error(`Type coercion to ${type} is not supported.`);
    }
    throw new Error(`Type coercion to ${type} is not supported.`);
  },

  convertToCustomType: function (value) {
    if (typeof value === "string" && value.startsWith("lol")) {
      return { type: "lol", value: value };
    }
    throw new Error("Conversion to custom type is not possible.");
  },
};

// Usage examples
// console.log(DataTransformationLibrary.addValues(10, 20)); // 30
// console.log(DataTransformationLibrary.addValues("Hello", " World")); // "Hello World"
// //console.log(DataTransformationLibrary.addValues(10, "Hello")); // Error: Addition is not possible for the given types.

// console.log(
//   DataTransformationLibrary.stringifyValue({ name: "John", age: 30 })
// ); // "{"name":"John","age":30}"
// console.log(DataTransformationLibrary.stringifyValue(true)); // "true"

// console.log(DataTransformationLibrary.invertBoolean(false)); // true
// //console.log(DataTransformationLibrary.invertBoolean("true")); // Error: Input value is not a boolean.

// console.log(DataTransformationLibrary.convertToNumber("123")); // 123
// console.log(DataTransformationLibrary.convertToNumber(false)); // 0
// console.log(DataTransformationLibrary.convertToNumber({ 123: "value" })); // 123

// console.log(DataTransformationLibrary.coerceToType("true", "boolean")); // true
// console.log(DataTransformationLibrary.coerceToType(123, "string")); // "123"
// //console.log(DataTransformationLibrary.coerceToType("custom-hello", "custom")); // { type: 'custom', value: 'hello' }
// //console.log(DataTransformationLibrary.coerceToType("123", "boolean")); // Error: Type coercion to boolean is not possible.
// //console.log(DataTransformationLibrary.coerceToType(true, "lol a")); // Error: Type coercion to custom is not supported.
// console.log(DataTransformationLibrary.convertToCustomType("lol a"));

/*Homework 4, Deadline 07.08.2023
Task 1: Object Property Manipulation

Create an object called person with the following properties and values:firstName: "John"
lastName: "Doe"
age: 30
email: "john.doe@example.com"Use property descriptors to make all properties of the person object read-only and non-writable, so their values cannot be changed directly.

Implement a method called updateInfo on the person object that takes a new info object as an argument. The info object should contain updated values for any of the properties (e.g., { firstName: "Jane", age: 32 }). Ensure that this method adheres to the read-only property descriptor set earlier.

Create a new property called address on the person object with an initial value of an empty object. Make this property non-enumerable and non-configurable.

Task 2: Object Property Enumeration and Deletion

Create a new object called product with the following properties and values:name: "Laptop"
price: 1000
quantity: 5Use property descriptors to make the price and quantity properties non-enumerable and non-writable.

Implement a function called getTotalPrice that takes the product object as an argument and returns the total price (calculated as price * quantity). Ensure that the function accesses the non-enumerable properties directly using the Object.getOwnPropertyDescriptor method.

Implement a function called deleteNonConfigurable that takes an object and a property name as arguments. The function should delete the specified property from the object if it exists. If the property is non-configurable, throw an error with an appropriate message.

Task 3: Object Property Getters and Setters

Create an object called bankAccount with the following properties and values:balance: 1000 (default value)Use a getter to define a property called formattedBalance, which returns the balance with a currency symbol (e.g., "$1000").

Use a setter to define a property called balance, which updates the account balance and automatically updates the corresponding formattedBalance value.

Implement a method called transfer on the bankAccount object that takes two bankAccount objects and an amount as arguments. The method should transfer the specified amount from the current account to the target account. Ensure that the balance and formattedBalance properties of both accounts are updated correctly.

Task 4: Advanced Property Descriptors

Implement a function called createImmutableObject that takes an object as an argument and returns a new object with all its properties made read-only and non-writable using property descriptors. The function should handle nested objects and arrays recursively.

Use the createImmutableObject function to create an immutable version of the person object from Task 1.

Task 5: Object Observation

Implement a function called observeObject that takes an object and a callback function as arguments. The function should return a proxy object that wraps the original object and invokes the callback function whenever any property of the object is accessed or modified.

Use the observeObject function to create a proxy for the person object from Task 1. The callback function should log the property name and the action (get or set) performed on the object.

Task 6: Object Deep Cloning

Implement a function called deepCloneObject that takes an object as an argument and returns a deep copy of the object. The function should handle circular references and complex nested structures. Do not use JSON methods.

Task 7: Object Property Validation

Implement a function called validateObject that takes an object and a validation schema as arguments. The schema should define the required properties, their types, and any additional validation rules. The function should return true if the object matches the schema, and false otherwise. You can choose any schema you want*/

//Task 1
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com",
  names: {
    fidel: "asd",
    emi: " add",
  },

  updateInfo: function (info) {
    if (typeof info === "object" && info !== null) {
      for (const key in info) {
        if (
          this.hasOwnProperty(key) &&
          Object.getOwnPropertyDescriptor(this, key).writable
        ) {
          this[key] = info[key];
        }
      }
    }
  },
};
for (const key in person) {
  Object.defineProperty(person, key, {
    writable: false,
  });
}

Object.defineProperty(person, "address", {
  value: {},
  enumerable: false,
  configurable: false,
});

// console.log(person.firstName); // Output: "John"
// console.log(person.age); // Output: 30

// person.updateInfo({ firstName: "Jane", age: 35 });
// console.log(person); // Output: 32
// person.address.street = "123 Main St";
// console.log(person.address); // Output: {}

// console.log(Object.keys(person)); // Output: ["firstName", "lastName", "age", "email"]

//Task 2
const product = {
  name: "Laptop",
  price: 1000,
  quantity: 5,
};

for (const key in product) {
  if (key === "quantity" || key === "price") {
    Object.defineProperty(product, key, {
      enumerable: false,
      writable: false,
    });
  }
}

function getTotalPrice(product) {
  const priceDescriptor = Object.getOwnPropertyDescriptor(product, "price");
  const quantityDescriptor = Object.getOwnPropertyDescriptor(
    product,
    "quantity"
  );

  if (!priceDescriptor || !quantityDescriptor) {
    throw new Error("Invalid product object.");
  }

  return priceDescriptor.value * quantityDescriptor.value;
}

function deleteNonConfigurable(object, propertyName) {
  const propertyDescriptor = Object.getOwnPropertyDescriptor(
    object,
    propertyName
  );
  if (!propertyDescriptor) {
    throw new Error(`Property does not exist.`);
  }
  if (!propertyDescriptor.configurable) {
    throw new Error(`Property is non-configurable.`);
  }
  delete object[propertyName];
}

// console.log(product);

// console.log(getTotalPrice(product));
// deleteNonConfigurable(product, "prisce"); // Error: Property 'price' is non-configurable.
// deleteNonConfigurable(product, "quantity"); // Error: Property 'quantity' is non-configurable.
// console.log(product);

//Task 3
const bankAccount = {
  _balance: 1000,

  get formattedBalance() {
    return `$${this._balance}`;
  },

  set balance(newBalance) {
    if (typeof newBalance === "number") {
      this._balance = newBalance;
    } else {
      throw new Error("Invalid value");
    }
  },

  transfer: function (targetAcount, amount) {
    if (typeof amount === "number" && amount >= 0 && this._balance >= amount) {
      this._balance -= amount;
      targetAcount._balance += amount;
    } else {
      throw Error("Invalid amount, or insufficient balance");
    }
  },
};

// console.log(bankAccount.formattedBalance);
// bankAccount.balance = 50;
// console.log(bankAccount.formattedBalance);

//Task 4
const createImmutableObject = function (obj) {
  const newObj = {};
  for (const key in obj) {
    let descriptor = Object.getOwnPropertyDescriptor(obj, key);
    if (
      descriptor &&
      typeof descriptor.value === "object" &&
      descriptor.value !== null
    ) {
      newObj[key] = createImmutableObject(descriptor.value);
    } else {
      descriptor.writable = false;
      newObj[key] = descriptor.value;
    }
    Object.defineProperty(newObj, key, descriptor);
  }
  return newObj;
};

console.log(createImmutableObject(person));

//Task 5
function observeObject(object, callback) {
  return new Proxy(object, {
    get(target, key, receiver) {
      callback(key, "get");
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      callback(key, "set");
      return Reflect.set(target, key, value, receiver);
    },
  });
}
const observedPerson = observeObject(person, (key, action) => {
  console.log(`Property '${key}' was ${action} on the object.`);
});

// console.log(observedPerson.firstName); // Output: "Property 'firstName' was get on the object."
// console.log(observedPerson.age); // Output: "Property 'age' was get on the object."

// observedPerson.firstName = "Jane";

//Task 6
const deepCloneObject = function (obj) {
  const newObj = {};
  for (const key in obj) {
    let descriptor = Object.getOwnPropertyDescriptor(obj, key);
    if (!newObj.hasOwnProperty(key)) {
      if (descriptor && typeof descriptor.value === "object") {
        createImmutableObject(descriptor);
      } else if (Array.isArray(descriptor)) {
        let clone = [];
        clone = Object.create(Object.getPrototypeOf(descriptor));
        Object.defineProperty(newObj, key, {
          value: descriptor,
        });
      }
      Object.defineProperty(newObj, key, {
        value: descriptor,
      });
    }
  }
  return newObj;
};
// console.log(deepCloneObject(person));

//Task 7
function validateObject(obj, schema) {
  for (const key in schema) {
    const expectedType = schema[key].type;
    const validation = schema[key].validate;

    if (!obj.hasOwnProperty(key)) {
      return false;
    }
    if (typeof obj[key] !== expectedType) {
      return false;
    }
    if (validation && !validation(obj[key])) {
      return false;
    }
  }
  return true;
}

// const personSchema = {
//   firstName: { type: "string" },
//   lastName: { type: "string" },
//   age: { type: "number", validate: (value) => value >= 0 }, // Age should be a positive number
//   email: { type: "string", validate: (value) => value.includes("@") }, // Email should contain @ symbol
// };

// console.log(validateObject(person, personSchema)); // Output: true

// const invalidPerson = {
//   firstName: "Jane",
//   lastName: "Doe",
//   age: -5,
//   email: "jane.doe.example.com",
// };

// console.log(validateObject(invalidPerson, personSchema)); // Output: false

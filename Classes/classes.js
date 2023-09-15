"use strict";
/*## Homework Assignment: Building an Online Bookstore

### Task

Your task is to design and implement an object-oriented program in JavaScript to simulate the functioning of an online bookstore. This assignment will test your understanding of classes, encapsulation, inheritance, and polymorphism.

### Instructions

### Part 1: Class Design

1. **Book Class**: Create a class called `Book` to represent individual books. Each book should have properties like title, author, ISBN, price, and availability.
2. **User Class**: Create a class called `User` to represent users of the bookstore. Users should have properties like name, email, and a unique user ID.
3. **Cart Class**: Design a class called `Cart` to simulate a shopping cart. It should have methods to add books, remove books, and calculate the total price of the books in the cart.
4. **Order Class**: Create an `Order` class to represent a user's order. It should include information about the user, the books ordered, and the total price.

### Part 2: Implementation

1. **Create Objects**: Instantiate multiple `Book` objects, representing different books available in the bookstore. Also, create a few `User` objects.
2. **Add Books to Cart**: Simulate users adding books to their cart by creating instances of the `Cart` class and using its methods.
3. **Place Orders**: Implement the process of placing an order. Users should be able to create instances of the `Order` class, specifying the books they want to purchase.

### Part 3: Demonstration

1. **Create a Scenario**: Design a scenario where users browse books, add them to their carts, and place orders. Simulate interactions between users, carts, and orders.
2. **Interaction**: Demonstrate how objects of different classes interact with each other. For example, a user interacts with a cart, and a cart interacts with orders.
3. **Polymorphism**: Utilize polymorphism by treating different types of books (e.g., fiction, non-fiction) uniformly when users add them to the cart.

### Part 4: Documentation

1. **Documentation**: Provide clear and concise comments and documentation for your code. Explain the purpose of each class, method, and property. Describe the interaction between different objects and how encapsulation is maintained.

### Submission

Submit your JavaScript program along with detailed documentation and comments that explain your code. Ensure that your code is well-structured and adheres to best practices in object-oriented programming.

### Example

Here's a simplified example structure to give you an idea of what your code might look like:

```jsx
class Book {
  constructor(title, author, isbn, price, availability) {
    // Properties and methods...
  }
}

class User {
  constructor(name, email, userId) {
    // Properties and methods...
  }
}

class Cart {
  constructor(user) {
    // Properties and methods...
  }
}

class Order {
  constructor(user, books) {
    // Properties and methods...
  }
}

// Instantiate objects and simulate bookstore interactions...

```

### Bonus (Optional)

- Implement additional features such as searching for books, applying discounts, handling payments, or integrating a database to store book and user information.
*/

//Part 1: Class Design

//Book class have 5 attributes. All of them will be received as parameters: tittle, author, isbn, price, availability.
//I build getters and a setter, is a good practice because it keeps encapsulation.
class Book {
  constructor(title, author, isbn, price, availability) {
    //the constructor method is used when an instance is created with the operator new
    //the instance state is filled with the values that constructor receive
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.price = price;
    this.availability = availability;
  }
  getTitle() {
    //getter for title
    return this.title;
  }
  getAuthor() {
    //getter for author
    return this.author;
  }
  getISBN() {
    // getter for ISBN
    return this.isbn;
  }
  getPrice() {
    //getter for price
    return this.price;
  }
  isAvailable() {
    //getter for availability
    return this.availability;
  }
  setAvailability(available) {
    //this method is a setter, we can change the availability with this
    this.availability = available;
  }
}

//The three classes bellow are Book children classes, this classes inherit all father class attributes and methods
class FictionBook extends Book {
  constructor(title, author, isbn, price, availability, genre) {
    //the constructor method is used when an instance is created with the operator new
    //the instance state is filled with the values that constructor receive, but the first thing that constructor does is call super() method. This will call the fathers constructor with //all the vallues
    super(title, author, isbn, price, availability);
    this.genre = genre;
  }
}

class NonFictionBook extends Book {
  constructor(title, author, isbn, price, availability, topic) {
    super(title, author, isbn, price, availability);
    this.topic = topic;
  }
}

class EpicBook extends Book {
  constructor(title, author, isbn, price, availability, genre) {
    super(title, author, isbn, price, availability);
    this.genre = genre;
  }
}

//User class have 3 attributes: name, email and id
class User {
  static #instanceId = 0; // the ID is unique, so i think this is a good way to keep the ID unique and auto increment. I used static because this modifier makes the ID an class attribute
  constructor(name, email) {
    User.#instanceId++;
    this.name = name;
    this.email = email;
    this.userId = User.#instanceId; //this is a good way to keep encapsulation
  }
  getName() {
    //name getter
    return this.name;
  }
  getEmail() {
    //email getter
    return this.email;
  }
  getUserId() {
    //id getter
    return this.userId;
  }
}

//Cart class only have 1 attribute: an array of items, books in this case
class Cart {
  constructor() {
    //the constructor dont  receive any parameter, only creates the items array
    this.cartItems = [];
  }
  addBook(book) {
    // this method receive a book, and add it to the array of items
    this.cartItems.push(book);
  }
  removeBook(book) {
    //this method delete a book of the array of items
    const index = this.cartItems.indexOf(book);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }
  calculateTotalPrice() {
    // this method runs the book array, and keep adding the price of each book, and return the total of the addition
    let totalPrice = 0;
    for (const book of this.cartItems) {
      totalPrice += book.price;
    }
    return totalPrice;
  }

  getBooks() {
    //this method return the array of items, only used for part 3
    return this.cartItems;
  }
}

//Order class receive two parameters: the user and an array of books
class Order {
  constructor(user, books) {
    //the constructor method is used when an instance is created with the operator new
    //this constructor receive and User as parameter. We can see the interaction between the classes Order and User
    this.user = user;
    this.books = books;
    this.totalPrice = this.calculateTotalPrice(); // totalPrice take the value of calculateTotalPrice()
  }

  calculateTotalPrice() {
    // this method runs the book array, and keep adding the price of each book, and return the total of the addition. Another way to do this, is receving a cart as
    //parameter, and use calculateTotalPrice() and the book for the Cart class
    let totalPrice = 0;
    for (const book of this.books) {
      totalPrice += book.price;
    }
    return totalPrice;
  }

  placeOrder() {
    //this method simulate the place Order of the user
    console.log(`Order placed by ${this.user.name}.`);
    console.log("Books in the order:");
    this.books.forEach((book) => {
      //print the tittle, author and price of each book of the books atribute
      console.log(`- ${book.title} by ${book.author} - $${book.price}`);
    });
    console.log(`Total Price: $${this.totalPrice}`);
  }
}

//Part 2: Implementation

//Here i created 3 books for testing and implementation, using "new" operator using name, author, isbn, price, aviability as arguments
const book1 = new Book("Book 1", "Author 1", "ISBN-123", 25.0, true);
const book2 = new Book("Book 2", "Author 2", "ISBN-456", 30.0, true);
const book3 = new Book("Book 3", "Author 3", "ISBN-789", 20.0, false);

//I created 3 users, using only name and email because the ID is auto generated.
const user1 = new User("Fidel", "fidel@example.com");
const user2 = new User("Emiliano", "emiliano@example.com");
const user3 = new User("Armando", "armando@example.com");

//Created 2 carts
const userCart = new Cart();
const userCart2 = new Cart();

//I added books to the carts and remove too
userCart.addBook(book1);
userCart.addBook(book2);
userCart2.addBook(book1);
userCart2.addBook(book2);
userCart2.addBook(book3);

userCart.removeBook(book1);
userCart2.removeBook(book3);

const totalPrice = userCart.calculateTotalPrice();
const totalPrice2 = userCart2.calculateTotalPrice();
console.log(`Total Price: $${totalPrice}`);
console.log(`Total Price: $${totalPrice2}`);

const orderBooks = [book1, book2, book3];
const userOrder = new Order(user1, orderBooks);
userOrder.placeOrder();

//Part 3: Demonstration
//in this section i tried to recreate a scenario where users browse books, add them to their carts, and place orders. In this case we can see the interaction between the classes, and how it encapsulate their behavior. They interact with each other using methods
// User1 adds books to the cart
const cart1 = new Cart(user1);
cart1.addBook(book1);
cart1.addBook(book2);
cart1.addBook(book3);

// User2 adds books to the cart
const cart2 = new Cart(user2);
cart2.addBook(book2);
cart2.addBook(book3);

// User1 reviews and modifies the cart
cart1.removeBook(book2);

// User2 reviews and modifies the cart
cart2.removeBook(book3);

// User1 and User2 place orders
const order1 = new Order(user1, cart1.getBooks());
const order2 = new Order(user2, cart2.getBooks());

console.log("Order 1 Summary:");
console.log("User: " + order1.user.name);
console.log("Books: ");
order1.books.forEach((book) => {
  console.log(book.title);
});
console.log("Total Price: $" + order1.totalPrice.toFixed(2));

console.log("\nOrder 2 Summary:");
console.log("User: " + order2.user.name);
console.log("Books: ");
order2.books.forEach((book) => {
  console.log(book.title);
});
console.log("Total Price: $" + order2.totalPrice.toFixed(2));

//Polymorphism
//Create 3 instances of the child classes of book. They inherit the attributes and the methods of the father class. But they add one attribute called genre.
const fictionBook = new FictionBook(
  "Fiction Book",
  "Author A",
  "ISBN-F1",
  20.0,
  true,
  "Mystery"
);
const nonFictionBook = new NonFictionBook(
  "Non-Fiction Book",
  "Author B",
  "ISBN-NF1",
  15.0,
  true,
  "Science"
);
const epicBook = new EpicBook(
  "EpicBook",
  "Author C",
  "ISBN-F1",
  50.0,
  true,
  "Epico"
);

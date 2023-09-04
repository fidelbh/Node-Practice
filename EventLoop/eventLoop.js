"use strict";
/*### Task

Your task is to create a Node.js program that delves deeply into the mechanics of the event loop. You will implement various asynchronous operations, microtasks, and investigate the interactions between different phases of the event loop.

### Instructions

1. **Async Operation Manager**: Implement a class called `AsyncOperationManager`. This class should have methods for scheduling asynchronous operations with varying delay times.
2. **Event Loop Simulation**: In the `AsyncOperationManager` class, implement a method called `simulateAsyncOperation` that takes a delay time (in milliseconds) as an argument. Use `setTimeout` to simulate an asynchronous operation and log a message after the specified delay.
3. **Microtask Scheduler**: After each `simulateAsyncOperation` call, use `process.nextTick` to schedule a microtask that logs a message. Observe how microtasks are executed immediately after the completion of the current phase.
4. **Immediate Task Scheduler**: Implement a method called `scheduleImmediate` in the `AsyncOperationManager` class that uses `setImmediate` to schedule a task that logs a message. Observe the behavior of `setImmediate` in the context of the event loop.
5. **Execution Flow Analysis**: In your code comments, explain the expected execution flow of the event loop as it transitions through different phases during the execution of your asynchronous operations, microtasks, and tasks scheduled with `setImmediate`.

### Submission

Submit your Node.js program in a file along with comments that provide a detailed explanation of each part of the code. Your comments should describe the event loop's behavior, the order of execution, and the role of microtasks and `setImmediate`.

### Example

For example, your code might look like this:

```jsx
class AsyncOperationManager {
  simulateAsyncOperation(delay) {
    setTimeout(() => {
      console.log(`Async operation completed after ${delay} ms`);
    }, delay);
  }

  scheduleImmediate() {
    setImmediate(() => {
      console.log("Immediate task executed");
    });
  }

  // Implement process.nextTick scheduling and event loop interactions
}

const manager = new AsyncOperationManager();
manager.simulateAsyncOperation(200);
process.nextTick(() => {
  console.log("Microtask executed immediately");
});
manager.scheduleImmediate();

```

### Bonus

Create a scenario where multiple microtasks and immediate tasks are scheduled within different phases of the event loop. Analyze the execution order and provide insights into how the event loop manages these tasks.*/

//Creation an instance of the AsyncOperationManager.
class AsyncOperationManager {
  simulateAsyncOperation(delay) {
    setTimeout(() => {
      console.log(`Async operation completed after ${delay} ms`);
    }, delay);
  }
  //simulateAsyncOperation scheludes an asynchronous operation. This will be complete after 200 ms (is the value of the parameters that the method receive). This method works with setTimeout(). With it, the method can schelude the script, that will be runned after 200 ms, in this case "Async operation completed after ${delay} ms".

  scheduleImmediate() {
    setImmediate(() => {
      console.log("Immediate task executed");
    });
  }
  //scheludeInmediate uses setImmediate(). This method is designed to execute a script once the current poll phase completes.

  scheduleNextTick() {
    process.nextTick(() => {
      console.log("Microtask executed immediately");
    });
  }
  //scheludeNextTick scheludes a microtask using process.nextTick(). This task have a higher priority than tasks scheluded by the other two methods because fires immediately on the same phase.
}

//First, create an instance of AsyncOperation manager class.
const manager = new AsyncOperationManager();

//Then i call it with 200 as argument, expecting the task will be completed after 200 ms.
manager.simulateAsyncOperation(200);

//After that i call scheludeNextTick. This method will execute the task immediately.
manager.scheduleNextTick();

//Last call will me scheduleImmediate that will execute in a later phase of the event loop.
manager.scheduleImmediate();

/*The expected order of console output will be:
1."Microtask executed immediately"-> scheduleNextTick() log.
2."Immediate task executed" -> scheludeImmediate().
3."Async operation completed after 200ms" -> simulateAsyncOperation(200).

This sequence demostrates the priority of microtasks, over task scheduled with setTimeout abd setImmediate.
Quoting the information of this lecture: "In essence, the names should be swapped. process.nextTick() fires more immediately than setImmediate(), but this is an artifact of the past wich is unlikely to change."
Using setImmediate() is recommended because is easier to reason about.
The main reasons to use process.nextTick() are: allows users to handle errors, cleanup any undneeded resoures; and because ai times it's necessary to allow a callback to run after the call stack has unwound but before the event loop continues. 
*/

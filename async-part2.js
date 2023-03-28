/* 
Part 2 : How to use Promises 
--------------------------------------------Notes-----------------------------------------------------------------------------------
-Promises are a fundamental part of asynchronous programming in JS.

-Promise - is an object returned by an asynchronous function , represents the current state of the operation
-When the promise is returned to the caller, the operation often isn't finished.
-When the promise object is returned, it contains methods on how to deal with the outcome of the operation.

Fetch() API is the modern, promise based replacement for XMLHttpRequest 


const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

console.log(fetchPromise);

fetchPromise.then((response) => {
  console.log(`Received response: ${response.status}`);
});

console.log("Started request…"); */
/* 


-----Chaining Promises 

After getting the Response Object, you need to get the response data. This is done by calling another function.

To get the JSON data , we need to call json()(asynchronous) method of Response object.

A then handler is added , returns a promise returned by json()

the second then() is then called on that returned value. THis promise chaining, this is done to avoid indentation in our programs
for readibility

const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

fetchPromise
  .then((response) => response.json())
  .then((data) => {
    console.log(data[0].name);
  });
  ---------------------------------------------------Catching Errors 
-Promise objects provide a catch() method. 
-You can call and pass in a  handler function for the catch method .The catch method would be called when an asynchronous function fails.
- Adding the catch method at the end of the promise chain , will allow to determine if any of the function calls have an error.
-Catch() method allows for errors to be dealt with all in place 

const fetchPromise = fetch('bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

fetchPromise
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data[0].name);
  })
  .catch((error) => {
    console.error(`Could not get products: ${error}`);
  });
-
-------------------------------------------Promise Terminology 
Promise has three different states :
 Pending-creation of promise,async function has not failed or finished yet ,

Fulfilled- A promise is fulfilled , and then() handler is called 

Rejected- Promise has failed , catch handler is called

----- -------------------------------------Combining multiple Promises
Promise.all() - allows for all the promises to be fulfilled , without depending on each other .It initiates all promises at the same time
it can take an array of promise and it only returns a  single promise .
Promise.all is fulfilled if all promises fulfilled 


Promise.any()- will be fulfilled as long as one of the array of the promises is fulfilled, and reject if all are rejected 

const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
const fetchPromise3 = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
  .then((responses) => {                                //The then handler function is called with array of responses in the same order
    for (const response of responses) {
      console.log(`${response.url}: ${response.status}`);
    }
  })
  .catch((error) => {                                 // If the promises in the array are rejected , the .catch handler is called 
    console.error(`Failed to fetch: ${error}`)
  });
------------------------------------------ Async and await 
Async- placing async in front of function declaration makes a function asynchronous

async function myFunction() {
  // This is an async function
}

await keyword can be used inside an async function , it is placed before a call to a function, it returns a  promise 
this causes  the code wait until the promise is finished .for example:



async function fetchProducts() {
  try {

    // after this line, our function will wait for the `fetch()` call to be settled
    // the `fetch()` call will either return a Response or throw an error

    const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // after this line, our function will wait for the `response.json()` call to be settled
    // the `response.json()` call will either return the parsed JSON object or throw an error

    const data = await response.json();
    console.log(data[0].name);
  }
  catch (error) {
    console.error(`Could not get products: ${error}`);
  }
}

fetchProducts();


using the await fetch method causes the function to behave like a synchronous function , in which you have to wait for all the 
promises to be fulfilled until it can continue .

You can only use await and async function within a JS module 

 */
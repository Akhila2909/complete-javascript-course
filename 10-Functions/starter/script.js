'use strict';

/****************FUNCTIONS******************************/

//Default parameters
const bookings=[];

const createBooking=function(flightNo=100,passenger=2,cost=200*passenger){
    const booking={
        flightNo,
        passenger,
        cost
    }
    console.log(booking);
    bookings.push(booking);
}

createBooking(10);


//pass by value(primitives) & reference (objects)
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;
  if (passenger.passport === 24739479284) {
    console.log('Checked in');
  } else {
    console.log('Wrong passport!');
  }
};

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

//JavaScript does not have pass by reference.
/*for objects, we do in fact pass in a reference, the memory address of the object.
However, that reference itself is still a value. It's simply a value that contains a memory address.
So basically we pass a reference to the function,but we do not pass by reference */


/********FIRST CLASS VS HIGHER ORDER FUNCITONS**************/

// FIRST CLASS - functions are simply treated as values - storing them in variables or object properties, function expression,
//pass functions as arguments to other functions, return a function from another function,there are also function methods.
//i.e methods that we can call on functions.

//HIGHER ORDER FUNCITON-a function that receives another function as an argument, 
//or a function that returns a new function



/************************CALL BACK FUNCTIONS**********************/
//the function that is passed in is a callback function. That's because the callback function will be called later
//by the higher order function, we do not call them ourselves but instead we tell JavaScript to basically call them later
//used for abstraction


const firstWordCapital=function(str){
    const space=str.indexOf(' ');
    return str.slice(0,space).toUpperCase()+str.slice(space);
//  const [first, ...others] = str.split(' ');
//  return [first.toUpperCase(), ...others].join(' ');
}


const lastLetterCapital=function(str){
    return str.slice(0,str.length-1)+str.slice(-1).toUpperCase();
}

const transform=function(str,fn){
    return (`Transformed :'${fn(str)}'`);
}

console.log(transform('Akhila is my name',firstWordCapital));

console.log(transform('Akhila is my name',lastLetterCapital));


// JS uses callbacks all the time
const high5 = function () {
    console.log('👋');
  };

document.body.addEventListener('click', high5);


['Jonas', 'Martha', 'Adam'].forEach(high5);

/***********************************FUNCTIONS RETURNING OTHER FUNCTIONS*****************************************/
const greet = function (greeting) {
    return function (name) {
      console.log(`${greeting} ${name}`);
    };
  };
  
  const greeterHey = greet('Hey');
  greeterHey('Jonas');
  greeterHey('Steven');
  
  greet('Hello')('Jonas');
  
  // Challenge
  const greetArr = greeting => name => console.log(`${greeting} ${name}`);
  
  greetArr('Hi')('Jonas');


  //this keyword depends on how the function is called

  //call() & apply() - explicitly define the this keyword in any function that we want. Calls the function 
  //function in JS is an object and object have functions so they can have too

  const indigo={
    airline:'Indigo',
    abb:'IND',
    bookings:[],
    book(flightNo,passenger){
      console.log(`${passenger} booked ${flightNo} on airline ${this.airline}`);
      this.bookings.push(flightNo,passenger);
    }
  }

  indigo.book(23,'Akhila');

  //fn is a value
  const book=indigo.book;

  //won't work - this keyword is undefined
  // book(23,'Akhila');

  const airasia={
    airline:'AirAsia',
    abb:'AA',
    bookings:[],
    }
  
   const vistara={
      airline:'Vistara',
      abb:'V',
      bookings:[],
      }

  //first argument of the call method - sets 'this' keyword of the fn to the reference passed | rest arguments - fn call arguments
  book.call(airasia,44,'Kiru');

  book.call(vistara,55,'Mum');

  //apply() is same as call but it receives a list of arguments in array
  const details=['55','Pappa'];
  book.apply(vistara,details);

  //better is using call with spread operator
  book.call(vistara, ...details);


  /***************** BIND KEYWORD ********************/

  //does not call but returns a new function where this keyword is bound.It's set to the reference that is passed

  const bookIND=book.bind(indigo);
  const bookAA=book.bind(airasia);
  bookIND(100,'Mary');
  bookAA(200,'Nary');


  //we can pass multiple arguments here besides this keywords then these arguments will also be basically set in stone
  //specifying parts of the argument beforehand -  partial application

  const bookIND23=book.bind(indigo,23);
  bookIND23('Mary');
  bookIND23('Nary');

  //In an event handler function this keyword always points to the element on which that handler is attached to
  //The event listener function is calling the callback function and so the button itself will then become this keyword
  

 indigo.planes=300;
 indigo.buyPlane=function(){
  console.log(this);
  this.planes++;
  console.log(this.planes);
 }

  document.querySelector('.buy').addEventListener('click',indigo.buyPlane);

  //bind used since it returns a fn which we can pass to eventListener which expects a function
  //call not used since it calls a fn

  document.querySelector('.buy').addEventListener('click',indigo.buyPlane.bind(indigo));

  const addTax = (rate, value) => value + value * rate;
  console.log(addTax(0.1, 200));

  // Partial application - rate is set (should follow order of arguments)
  //we just say, null. It could be any other value because nothing will happen with it
  const addVAT = addTax.bind(null, 0.23);

  console.log(addVAT(100));
  console.log(addVAT(23));


/*************************** Immediately Invoked Function Expressions*******************/

//a function that is only executed once and then never again.

//function inside the () is function expression/ value. The () after this () invokes it immediately.Hence IIFE

(function runOnce(){
 console.log("I run once");
 const isPrivate=23;
})();


(()=> console.log("I run once"))();

//scopes are a good tool to hide variables - inside function scope so not accessible 
// console.log(isPrivate);

//Variables declared with let or const create their own scope inside a block
{
  const isPrivate = 23;
  var notPrivate = 46;
}

// console.log(isPrivate); not accesible
console.log(notPrivate);


/************************************CLOSURES******************************************/

//We don't create closures manually.A closure simply happens automatically in certain situations

//Any function always has access to the variable environment of the execution context in which the function was created

//a closure makes sure that a function does never lose connection to the variables that existed at the function's birthplace

//a closure makes sure that a function has in it's backpack variables that existed at the function's birthplace


const bookSeat=function(){
  let passengerCount=0;

  return function(){
    passengerCount++;
    console.log("seats booked"+passengerCount);
  }
}

const booker=bookSeat();

booker();
booker();
booker();

//we cannot just reach into a closure and take variables from it because a closure is just an internal property of a function

//whenever you see these double brackets, it is an internal property which we cannot access from our code.

//console.dir(function name) - internal properties of fn

// More Closure Examples
// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning f function
h();
f();
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassengers(180, 3);

// closure also includes the arguments





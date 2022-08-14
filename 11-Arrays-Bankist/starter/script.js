'use strict';
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

/****************************    SIMPLE ARRAY METHODS    ********************************************************/

//methods are simply functions that we can call on objects.

//So if we have array methods, that means that arrays themselves are also objects


//SLICE- this does not mutate the original array. Instead it returns a new array
//2nd arg- index. extracted upto index-1

let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2));
console.log(arr.slice(2,4));
console.log(arr.slice(-1));
console.log(arr.slice(1,-2));
// create a shallow copy of any array.when you want to chain multiple methods together
console.log(arr.slice());


//SPLICE - same as slice, it changes the original array. the extracted elements are actually gone from the original array
//2nd arg- no of elements to extract

console.log(arr.splice(-1));
console.log(arr);
console.log(arr.splice(1,2));
console.log(arr);


//REVERSE - mutate the original array
let arr2 = ['a', 'b', 'c', 'd', 'e'];
console.log(arr2.reverse());
console.log(arr2);


//CONCAT- doesn't mutate
console.log(arr.concat(arr2));


//JOIN - joins elements of array & returns string
console.log(arr2.join('-'));


//AT-  extracts element of array at index , replaces [], method chaining
console.log(arr.at(0));
console.log(arr.at(-1));
console.log("akk".at(-1)); //works for strings


//FOREACH - requires a callback function. Calls this callback function in each iteration passing the current element as an argument
//continue and break don't work in this 

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

movements.forEach(function(movement){
  if(movement>0)
   console.log(`Deposit ${movement}`);
  else
   console.log(`Withdraw ${Math.abs(movement)}`);
})


//1st parameter -current element, 2nd - current index 3rd -entire array

movements.forEach(function(mov,i,arr){
  console.log(arr);
  if(mov>0)
   console.log(`${i} Deposit ${mov}`);
  else
   console.log(`${i} Withdraw ${Math.abs(mov)}`);
})

//underscore in JavaScript means a throwaway variable.variable that is completely unnecessary. _count

//FOREACH with MAPS & SETS

//with MAPS - current value, key, entire map 

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value,key,map){
  console.log(`${key}:${value}`);
})

//SETS - value, value, entire set 

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
currenciesUnique.forEach(function(value,value2,set){
  console.log(`${value}:${value2}`)
})


//Instead of writing our code in the global context it's always best to create a function
//It's a good practice to pass the data into a function. instead of having this function work with a global variable


//template literals are amazing for creating HTML templates,


// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements=function(movement){
  containerMovements.innerHTML=' ';
 movement.forEach(function(mov,i){
  const type=mov>0?'deposit':'withdrawal';
   const HTML=`<div class="movements__row">
   <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
   <div class="movements__date">3 days ago</div>
   <div class="movements__value">${mov}€</div>
   </div>`;
   containerMovements.insertAdjacentHTML('afterbegin',HTML);
 })
}

displayMovements(account1.movements);


//insertAdjacentHTML(position in which we want to attach the HTML,string containing html we want to insert)

//innerHTML property - returns everything including the tags


/****************************************  DATA TRANSFORMATION      *******************************/


//MAP - builds us a brand new array containing the results of applying call back function to each element of the original array

const eurrToUsd=1.1;

// const usdMovements=movements.map(function(mov){
//   return mov*eurrToUsd;
// })

const usdMovements=movements.map(mov=>mov*eurrToUsd);

console.log(usdMovements);
console.log(movements);

/*map method also has access to the exact same three parameters.We do not call the callback function by ourselves.
It is the map method who will call this function for each of the array elements.
Each time that the map method calls the  callback it will simply pass in the current array element, index and the whole array.
And off these three, here we are only using the first two*/


const movementDescription=movements.map((mov,i)=>`${i+1} You ${mov>0?'deposited':'withdrew'} ${mov}`);
console.log(movementDescription);



/* for each method creates side effects - In each iteration, we performed some action that was then visible in the console and
 we can call this a side effect. map doesn't create side effect*/


const accounts = [account1, account2, account3, account4];


const createUsername=function(accs){
  accs.forEach(acc=>acc.username=acc.owner.toLowerCase().split(' ').map(word=>word[0]).join(''))
}

createUsername(accounts);

accounts.forEach(acc=>console.log(acc));


//FILTER - Makes a new array with filtered elements. Filters array based on boolean condition specified by callback function
//callback function here also get access to the current index and the whole array

const deposits=movements.filter(mov=>mov>0);

console.log(deposits);

const withdrawls=movements.filter(mov=>mov<0);

console.log(withdrawls);

//REDUCE -  boilS down array into one single value & returns it (snowball effect)
//1st paramater- callback fn , 2nd- initial value of accumulator

// callback fn 
//1st paramater - snowball that keeps accumulating the value that we ultimately want to return,2nd-curr ele,3rd- index,4th- array
//In each loop iteration we return the updated accumulator


const balance=movements.reduce(function(acc,ele){return acc+ele},0);

console.log(balance);

const max=movements.reduce(function(acc,ele){return acc>ele?acc:ele},movements[0]);

console.log(max);

//CHAINING METHODS -PIPELINE

const totalDepositsUSD=movements.filter(mov=>mov>0).map(dep=>dep*eurrToUsd).reduce((acc,usdDep)=>acc+usdDep,0);

console.log(totalDepositsUSD);

//FOR DEBUG PURPOSE : if we want to see that result of intermediate operation, we can check out the current array and the next array method 
//that has chained on that filter through array parameter


console.log(movements);

const totalDepositsUSD2=movements.filter(mov=>mov<0).map((dep,ind,arrayAfterFilter)=>{
  console.log(arrayAfterFilter);
  return dep*eurrToUsd
}).reduce((acc,usdDep)=>acc+usdDep,0);


const calcDisplayBalance=function(movements){
  labelBalance.textContent=`${movements.reduce((acc,mov)=>acc+mov,0)}€`;
}

calcDisplayBalance(account1.movements);


const calcDisplayIncome=function(movements){
  labelSumIn.textContent=`${movements.filter(mov=>mov>0).reduce((acc,mov)=>acc+mov,0)}€`;
}

calcDisplayIncome(account1.movements);

const calcDisplayExpenditure=function(movements){
  labelSumOut.textContent=`${Math.abs(movements.filter(mov=>mov<0).reduce((acc,mov)=>acc+mov,0))}€`;
}

calcDisplayExpenditure(account1.movements);

const interesRate=1.2;
const calcDispalyInterest=function(movements){
  labelSumInterest.textContent=`${ movements.filter(mov=>mov>0).map(dep=>dep*1.2/100).filter(int=>int>=1).reduce((acc,int)=>acc+int,0)}€`;
}

calcDispalyInterest(account1.movements);

/*1.chaining tons of methods one after the other can cause a real performance issues.keep looking for optimizing.

2.  bad practice in JavaScript to chain methods that mutate the underlying original array.(splice /reverse method)*/



//FIND -to retrieve one element of an array based on a condition,accepts a condition,accepts a callback function
//returns the FIRST ELEMENT in the array that satisfies this condition


const firstWithdrawal=function(movements){
 console.log(movements.find(mov=>mov<0));
}

firstWithdrawal(account1.movements);

// BEST USE CASE- find an object in the array based on some property of that object

const findAccountByName=function(accounts,name){
  console.log(accounts.find(acc=>acc.name===name));
}

findAccountByName(accounts,'Sarah Smith');

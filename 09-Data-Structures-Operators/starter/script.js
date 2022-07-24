'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order:function(starterIndex,mainMenuIndex){
    return [this.starterMenu[starterIndex],this.mainMenu[mainMenuIndex]];
  },
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order2:function({starterIndex,mainIndex,locationIdex}){
    console.log(`order for '${this.mainMenu[mainIndex]}' and '${this.starterMenu[starterIndex]}' at location '${this.location[locationIdex]}'`)
   },

   orderPizza:function(ing1,ing2,ing3){
    console.log(`Here is your pizza with '${ing1}','${ing2}','${ing3}'`);
   },

   orderPizzaMain:function(mainIngredient,...others){
    console.log(mainIngredient);
    console.log(others);
   }
};

/* DESTRUCTURING ARRAYS

 Destructing Operator - [] - destructuring assignment
 declare the variables using const
 original array is intact*/

const [w,x,y,z]=restaurant.categories;;
console.log(w,x,y,z);

/*to not take all of the elements out of the array,  follow the order of the elements  */
const[a,b]=restaurant.categories;
console.log(a,b);

/*To skip an array element we leave a hole*/
let [m,,n]=restaurant.categories;
console.log(m,n);

/*switching variables */
[n,m]=[m,n]
console.log(m,n);

/*we can have a function, return an array and then we can immediately destruct the result into different variables */
const [starter,mainCourse]=restaurant.order(2,0);
console.log("your order"+starter+":::::"+mainCourse);

/*nested destructuring */
const nested=[2,3,[4,5]];
const[h,,j]=nested;
console.log(h,j);

const[g,,[k,l]]=nested;
console.log(g,k,l);

/*set default values for the variables when we don't know the length of the array eg API call */
const numbers=[2,3]
const[r=1,s=1,t=1]=numbers;
console.log(r,s,t);


/* DESTRUCTURING OBJECTS
taking out properties
Operator -{}
provide the variable names that exactly match the property names that we want to retrieve from the object 
order doesn't matter as exact names given
*/

const{name,openingHours,categories}=restaurant;
console.log(name,openingHours,categories);


/* give them new variable names when dealing with third-party data. */

const{name:myName,
  openingHours:myHours,
  categories:myCategories}=restaurant;
console.log(myName,myHours,myCategories);

/*Assign default value - To avoid undefined when reading a property that does not exist on the object */
const{cost=[],
  openingHours:hours,}=restaurant;
console.log(cost,myHours);

/* Mutating variables - use paranthesis (since only {} means code block acc to js*/
let q=10;
let p=20;
const obj={q:100,p:200};
({q,p}=obj);
console.log(p,q);

/*Nested Objects */
const{fri:{open,close}}=openingHours;
console.log(open,close);

const{fri:{open:o,close:c}}=openingHours;
console.log(o,c);


/* for functions with a lot of parameters, it can be hard to know the order of parameters
instead of defining the parameters manually, we can just pass an object into the function as an argument,
and the function will then immediately destructure that object*/
restaurant.order2({starterIndex:0,mainIndex:1,locationIdex:1});



/* SPREAD OPERATOR ...
expands an iterable(arrays, strings, maps, or sets, but not objects) into all its elements 
CAN ONLY USE THE SPREAD OPERATOR WHEN BUILDING AN ARRAY OR WHEN PASSING VALUES INTO A FUNCTION*/

//whenever we write an array literal
const arr=[2,3,4];
const brr=[0,1,arr[0],arr[1],arr[2]];

const crr=[0,1, ...arr];

//when we pass multiple arguments into function
console.log(2,3,4);
console.log(...arr);

//Adding new elements to array
const newMenu=[...restaurant.mainMenu,'Dosa'];
console.log(newMenu);

//Shallow Copy array 
const arrCopy=[...arr];
console.log(arrCopy);

//Merge 2 arrays
const menu=[...restaurant.starterMenu,...restaurant.mainMenu];
console.log(menu);


//spread operator works on all iterables
const names='Akhila';
const letters=[...names,'G.'];
console.log(letters);

console.log(...names);

//passing input values into fn
// const ingredients=[prompt('ingredient1?'),prompt('ingredient2?'),prompt('ingredient3?')];
// restaurant.orderPizza(...ingredients);


//ES2018 - works on objects too

const backUpRestaurant={...restaurant};
console.log(backUpRestaurant);

const newRestaurant={...restaurant,foundedIn:1998,rating:5};
console.log(newRestaurant);


/*REST OPERTAOR - 
packs rest of the elements into array
L.H.S of = */

//1.DESTRUCTURING
const [u,v,...rest]=[1,2,3,4,5];
console.log(rest);

//it does not include any skipped elements so the rest pattern always must be the last
const [pizza,,risotto,...restItems]=[...restaurant.mainMenu,...restaurant.starterMenu];
console.log(restItems);

//with objects
const {sat,...restHours}=restaurant.openingHours;
console.log(restHours);

//2.FUNCTIONS

//fn which accepts any no of parameters - 
const add=function(...numbers){
  let sum=0;
  for(let i=0;i<numbers.length;i++){
    sum+=numbers[i];
  }
  console.log(sum);
};

add(2,3);
add(4,5,6,77,9);

//rest and spread
const ab=[2,3,4];
add(...ab);

//collect all of the remaining basically unused parameters
restaurant.orderPizzaMain('mushroom','olives','cheese','spinach');


/*spread operator is used where we would otherwise write values, separated by a comma.
rest pattern is used where we would otherwise write variable names separated by commas. */


/*********************FOR OF LOOP*******************/

const myMenu=[...restaurant.mainMenu,...restaurant.starterMenu];
for(const item of myMenu)
  console.log(item);

for(const [index,element] of myMenu.entries())
  console.log(index, element);


/**********************ENHANCED OBJECT LITERALS**********/

const openHours= {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

//use object name directly
const hotel={title:'Helopl',openHours};
console.log(hotel);


/**********************STRINGS 1********************/

//JavaScript will convert that string primitive to a string object with the same content and
// then it's on that object where the methods are called.This process is called boxing

const airline = 'TAP Air Portugal';

console.log(airline[2]);
console.log(airline.slice(2));
console.log(airline.slice(-1));
console.log(airline.slice(2,4));
console.log('BHKI'[2]);
console.log(airline.indexOf('P'));
console.log(typeof new String('Akhila'));

console.log(airline.replace('TAP','PAT'));
console.log(airline.includes('APOL'));
console.log(airline.startsWith('TAP'));


//splits string and gives the result in an array
console.log(airline.split(' '));

const [firstName,middleName,lastName]=airline.split(' ');
console.log(firstName+" "+lastName);

//join() - joins string 
console.log(['A','B','C','D'].join('----'));

//padding - adding characters till it reaches the length
let str=airline.padStart(25,'*').padEnd(35,'&');
console.log(str+" "+str.length);

//repeat
console.log(airline.repeat(5));

//masking application

const maskCreditCard=function(cardNumber){
  const str=cardNumber+'';
  const last=str.slice(-4);
  console.log(last.padStart(str.length,'*'));
}

maskCreditCard(2236562772726);


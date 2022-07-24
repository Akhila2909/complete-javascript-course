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
const ingredients=[prompt('ingredient1?'),prompt('ingredient2?'),prompt('ingredient3?')];
restaurant.orderPizza(...ingredients);


//ES2018 - works on objects too

const backUpRestaurant={...restaurant};
console.log(backUpRestaurant);

const newRestaurant={...restaurant,foundedIn:1998,rating:5};
console.log(newRestaurant);

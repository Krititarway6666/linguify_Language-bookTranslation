// forEach() practice question sol

/*const arr=[1,5,6,3,7,8,9];
let sum=0;

function adder(arr){
  sum+=arr;
}
arr.forEach(adder);
 console.log(sum) ;  
*/

// map() practice question sol

/* const arr=[3,5,8,4,1];
let multiply=arr.map(val=>{
  return val*10
});
console.log(multiply);

//filter()  eg 1

 const ages=[32,33,16,40];
 console.log(ages.filter(age=>age>18));

//eg2

const words=[
  "spray","limit","elite","exuberant","destruction","present"
];

console.log(words.filter(word=>word.length>6));*/

//DOM

//console.log(document);
//console.log(document.head);

const container=document.querySelector(".container");
const h1=document.querySelector(".main-headings");
const p=document.querySelector(".sub-headings");
const btn=document.querySelector(".btn");

container.style.height="400px";
container.style.backgroundColor="teal";
h1.style.color='skyblue';
p.style.fontFamily="sans-serif";
p.style.color="white";
// this keyword
/*const person={
    name:"kriti",
    age:19,
    greetRegular:function(){
        console.log(`hello my name is ${this.name} & i am ${this.age} years old`);
    },
   greetArrow:()=>{
    console.log(`hello my name is ${this.name} & i am ${this.age} years old`);
   }
};

person.greetRegular();
person.greetArrow();      */

//factory function 
/*function vehicleInfo(type,brand,model,year){
  return{ 
    type,
    brand,
    model,
    year
  };
};

console.log(vehicleInfo("Car","abc",'654bd',2013));

//constructors practice que 1

function Person(name,age,gender){

  this.name=name;
  this.age=age;
  this.gender=gender;
  this.info=function(){
    console.log(`person's name is ${this.name} is a ${this.gender} of ${this,age} years old`);
  }

}

const kittu= new Person("kittu",19,"f");
console.log(kittu);
kittu.info();

// constructors practice que 2

function Car(make,model,year,color){
  this.make=make;
  this.model=model;
  this.year=year;
  this.color=color;

  this.start=function(){
    console.log(`starting the ${this.make} ${this.model}....`)
  }

  this.stop=function(){
    console.log(`stopping the ${this.make} ${this.model}....`)
  }
}

const car1 = new Car("Toyota","comry",2015,"blue");
const car2 = new Car("Honda","CR_V",2018,"red");

car1.start();
car2.stop();

//prototypical inhertance

function Animal(name){
  this.name=name;
}
Animal.prototype.sound=function(){
  return "Animal sound"
}

const dog= new Animal("dog");
console.log(Animal.__proto__);
console.log(dog);

//classes

class Hero{
  constructor(name,level){
  this.name=name;
  this.level=level;
  }
  greet(){
    console.log(`Hello I am ${this.name}`);
  }
  
}

const kittu = new Hero("kittu", 1);
console.log(kittu);
kittu.greet();

class Mega extends Hero{
  Constructor(name,level,spell){
    Super(name,level);
    this.spell
  }
}

const kriti= new Mega("kriti",1,"no");
console.log(kriti);
kriti.greet();*/

// call back hell

console.log("start");

function getUsersDataFromDB(name,callback){
  setTimeout(()=>{
    console.log("Getting user name");
    callback(name);
  },2000);
}

function getUserHobbies(name,callback){
  setTimeout(()=>{
     const hobbies=['reading','dancing','singng'];
    console.log("getting user hobbies");
    callback(hobbies);
  },2000);
}

getUsersDataFromDB("kriti",(data)=>{
  console.log(data);
  getUserHobbies(data,(hobbies)=>{
    console.log(hobbies);
  });
});


console.log("End");

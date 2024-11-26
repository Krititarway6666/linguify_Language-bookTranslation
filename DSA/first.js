/*let allStudents=["kriti","apurwa","Mahima"];
function find(allStudents,studentName){
    for ( let student in allStudents){
          if(allStudents[student]==="Mahima"){
            console.log(`The student ${studentName} is at ${student} index`);
          }
    }
}

find(allStudents,"Mahima");*/


// Array datastructures

class MyArray{
  constructor(){
    this.length = 0;
    this.data ={};
  }
  push(value){
    this.data[this.length]=value;
    this.length++;
    return this.length;
    
 }
 get(index){
  return this.data[index];
 }

 pop(){
  let value =this.data[this.length-1];
  delete this.data[this.length-1];
  this.length--;
  return value;
 }

}

const myNewArray = new MyArray();
myNewArray.push('kriti');
myNewArray.push('mahima');
myNewArray.push('apurwa');

console.log(myNewArray);
 let a=myNewArray.pop();
 console.log(a);

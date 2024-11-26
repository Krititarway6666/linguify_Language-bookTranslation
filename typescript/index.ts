// type narrowing with type guards(typeof)
type mytype=string|number;

function example(value:mytype){
    if(typeof value==="string"){
        console.log(value.toUpperCase());
    }else{
        return value.toFixed(2); // toFixed is used to format a number to a specified
                                 // number of decimal places.It returns a string of that formateed number.
    }
}

console.log( typeof example(5432));

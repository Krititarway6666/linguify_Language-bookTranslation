import { useState } from 'react'
function App(){

  let [counter,setCounter] = useState(10)
  const addValue= ()=>{
    if(counter<20){
    counter=counter+1;
    setCounter(counter)
    }else{
      alert("maximum value is 20 can't increase the value");
    }
  }

  const removeValue= ()=>{
    if(counter>0){
    counter=counter-1;
    setCounter(counter)
    }
    else{
      alert("minimum value is 0 can't decrease the value");
    }
  }

  return(
    <>
    <h1>chai aur react</h1>
    <h2>counter value: {counter}</h2>

    <button
    onClick={addValue}
    >Add value {counter}</button><br/>
    <button onClick={removeValue}>Remove value{counter}</button>
    </>
  )
}
export default App
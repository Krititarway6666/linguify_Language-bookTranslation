import { useState } from 'react'
import './App.css'

function App() {
    let [color,setColor] = useState("olive")
 return(
 
  <div className="w-full h-screen duration-200"
   style={{backgroundColor: color}}
 >
    <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
        <div className='flex flex-wrap justify-center gap-3 shadow-xl bg-white px-3 py-2 rounded-xl'>
        <button onClick={()=>setColor("red")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg bg-[red]'>Red</button>
        <button onClick={()=>setColor("green")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg bg-[Green]'>Green</button>
        <button onClick={()=>setColor("blue")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg bg-[Blue]'>Blue</button>
        <button onClick={()=>setColor("black")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg bg-[black]'>Black</button>
        <button onClick={()=>setColor("gray")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg bg-[gray]'>Gray</button>
        <button onClick={()=>setColor("#ff4ea9")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg bg-[#ff4ea9]'>Pink</button>
        <button onClick={()=>setColor("crimson")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg bg-[crimson]'>crimson</button>
        <button onClick={()=>setColor("cyan")}className='outline-none px-4 py-1 rounded-full text-white shadow-lg bg-[cyan]'>cyan</button>
        </div>
    </div>
 </div>
 
 
 )
}

export default App

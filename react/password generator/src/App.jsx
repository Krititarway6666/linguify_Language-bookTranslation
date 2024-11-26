import { useState, useCallback,useEffect,useRef} from 'react'
function App(){
    const [length,setLength]=useState(8);
    const [numberAllowed,setNumberAllowed]=useState(false);
    const [charAllowed, setCharAllowed]=useState(false);
    const [password,setpassword]=useState("");

    // useREF hook
 const passwordRef =useRef(null);

    const passwordGenerator= useCallback(()=>{
        let pass="";
        let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if (numberAllowed) str+= "0123456789"
        if(charAllowed) str+= "!@#$%^&*_-+={}[]~`"

        for(let i=1;i<=length;i++){
            let char=Math.floor(Math.random()*str.length+1);
            pass+=str.charAt(char)

            setpassword(pass)
        }
    },[length,numberAllowed,charAllowed,setpassword])

    const copyPasswordToClipboard = useCallback(()=>{
        passwordRef.current?.select();
       // passwordRef.current?.setSelectionRange(0,9)  it selects only 9 elements
        window.navigator.clipboard.writeText(password)
    },[password])
    
    useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])



    return(
        <div className='bg-black w-full h-screen'>
            <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 text-orange-500 bg-gray-700'>
            <h1 className='text-white text-center'>password Generator</h1>
              <div className='flex shadow-md rounded-lg overflow-hidden mb-4'>
                <input type="text" value={password} className=' outline-none w-full py-1 px-3' placeholder="password" readonly ref={passwordRef}/>
                <button className='bg-blue-700 text-white px-3' 
                onClick={copyPasswordToClipboard}>copy</button>
              </div>

             <div className='flex text-sm gap-x-2'>
                <div className='flex items-center gap-x-1'>
                    <input type="range" min={8} max={100} value={length} className='cursor-pointer ' onChange={(e)=>{setLength(e.target.value)}}/>
                    <label htmlFor="length">Length:{length}</label>
                </div>
                <div className='flex items-center gap-x-1'>
                    <input type="checkbox" defaultChecked={numberAllowed} onChange={()=>{setNumberAllowed((prev)=>!prev)}}/>
                     <label>Number</label>
                </div>
                <div className='flex items-center gap-x-1'>
                    <input type="checkbox" defaultChecked={charAllowed} onChange={()=>{setCharAllowed((prev)=>!prev)}}/>
                     <label>Character</label>
                </div>
             </div>
            </div>
        
        </div>
    )
}
export default App;

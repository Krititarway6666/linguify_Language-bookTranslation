const emoji=document.querySelector("#emoji");
const emojis=[
"😊","😂","🤣","❤️","😍","😒","😁","😘","😉","😋","😄","😃","🥰","😘","😍","😅","🤗","🤩","🤔","🙂","😚","😗","😙","🥲","🤔","😉"];
emoji.addEventListener('mouseover',()=>{
   emoji.innerHTML=emojis[Math.floor(Math.random()*emojis.length)]; 
});
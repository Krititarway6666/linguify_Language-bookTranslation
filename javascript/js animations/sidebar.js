const sidebar=document.querySelector(".sidebar");
const button=document.querySelector('button');

button.addEventListener("click",()=>{
   sidebar.classList.toggle("hide");
});